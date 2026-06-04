"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const logger_service_1 = require("../../../../../../../../../../src/common/logger/logger.service");
const { generateAccessToken, generateRefreshToken, } = require('../utils/jwt.util');
let AuthService = class AuthService {
    constructor(dbProvider, appLogger) {
        this.dbProvider = dbProvider;
        this.appLogger = appLogger;
        this.Users = this.dbProvider.db.users;
        this.UserRole = this.dbProvider.db.user_roles;
        this.RolePermissions = this.dbProvider.db.role_permissions;
        this.Permissions = this.dbProvider.db.permission;
        this.Roles = this.dbProvider.db.roles;
        this.Companies = this.dbProvider.db.companies;
    }
    async login(username, password) {
        const log = this.appLogger.forContext('AuthService', 'login', {
            email: username,
        });
        log.info('Login attempt started');
        let user;
        try {
            user = await this.Users.findOne({
                where: { email: username },
                include: [
                    {
                        model: this.Companies,
                        as: 'company',
                        attributes: ['id', 'name', 'email', 'phone', 'address'],
                    },
                ],
            });
        }
        catch (err) {
            log.error('DB error while fetching user', err);
            throw new Error('DATABASE_ERROR');
        }
        if (!user) {
            log.warn('Login failed — user not found');
            return { success: false, message: 'Invalid email or password' };
        }
        const logU = log.enrich({ userId: user.id });
        let isMatch = false;
        try {
            isMatch = await bcrypt.compare(password, user.password);
        }
        catch (err) {
            logU.error('bcrypt comparison error', err);
            throw new Error('AUTH_INTERNAL_ERROR');
        }
        if (!isMatch) {
            logU.warn('Login failed — password mismatch');
            return { success: false, message: 'Invalid email or password' };
        }
        let userDetails;
        try {
            userDetails = await this.UserRole.findAll({
                where: { user_id: user.id },
                include: [
                    {
                        model: this.Roles,
                        as: 'role',
                        include: [
                            {
                                model: this.RolePermissions,
                                as: 'role_permissions',
                                include: [{ model: this.Permissions, as: 'permission' }],
                            },
                        ],
                    },
                ],
            });
        }
        catch (err) {
            logU.error('DB error while fetching roles', err);
            throw new Error('DATABASE_ERROR');
        }
        const roleNames = userDetails
            .map((i) => i.role?.name)
            .filter(Boolean);
        const permissionNames = [
            ...new Set(userDetails.flatMap((i) => i.role?.role_permissions
                ?.map((rp) => rp.permission?.name)
                .filter(Boolean) ?? [])),
        ];
        logU.debug('Roles resolved', {
            roles: roleNames.join(','),
            permissionCount: permissionNames.length,
        });
        const payload = {
            userId: user.id,
            companyId: user.company_id,
            email: user.email,
        };
        let accessToken;
        let refreshToken;
        try {
            accessToken = generateAccessToken(payload);
            refreshToken = generateRefreshToken(payload);
        }
        catch (err) {
            logU.error('Token generation failed', err);
            throw new Error('TOKEN_GENERATION_ERROR');
        }
        this.Users.update({ last_login: new Date() }, { where: { id: user.id } })
            .then(() => logU.debug('last_login updated'))
            .catch((err) => logU.warn('Non-critical: last_login update failed', err));
        logU.info('Login successful');
        return {
            success: true,
            message: 'Login successful',
            data: {
                accessToken,
                refreshToken,
                user: {
                    id: user.id,
                    company_id: user.company_id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    phone: user.phone,
                    company: user.company
                        ? {
                            id: user.company.id,
                            name: user.company.name,
                            email: user.company.email,
                            phone: user.company.phone,
                            address: user.company.address,
                            logo: user.company.logo,
                            is_active: user.company.is_active,
                        }
                        : null,
                    roles: roleNames,
                    permissions: permissionNames,
                },
            },
        };
    }
    async register(first_name, last_name, email, phone, password) {
        const log = this.appLogger.forContext('AuthService', 'register', {
            email,
        });
        log.info('Registration attempt started');
        let existingUser;
        try {
            existingUser = await this.Users.findOne({ where: { email } });
        }
        catch (err) {
            log.error('DB error while checking existing email', err);
            throw new Error('DATABASE_ERROR');
        }
        if (existingUser) {
            log.warn('Registration failed — email already exists');
            return { success: false, message: 'Email already exists' };
        }
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            log.error('bcrypt hashing failed', err);
            throw new Error('AUTH_INTERNAL_ERROR');
        }
        let newUser;
        try {
            newUser = await this.Users.create({
                first_name,
                last_name,
                email,
                phone,
                password: hashedPassword,
                company_id: 1,
            });
        }
        catch (err) {
            log.error('DB error while creating user', err);
            throw new Error('DATABASE_ERROR');
        }
        log.enrich({ userId: newUser.id }).info('User registered successfully');
        return {
            success: true,
            message: 'User created successfully',
            data: {
                id: newUser.id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                phone: newUser.phone,
                company_id: newUser.company_id,
            },
        };
    }
    async logout(userId) {
        const log = this.appLogger.forContext('AuthService', 'logout', {
            userId,
        });
        log.info('Logout attempt started');
        try {
            return {
                success: true,
                message: 'Logout successful',
            };
        }
        catch (err) {
            log.error('Logout failed', err);
            throw new Error('LOGOUT_ERROR');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _a : Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map