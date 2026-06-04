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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const response_util_1 = require("../../../../../../../../../../src/Utils/response.util");
const register_dto_1 = require("./dto/register.dto");
const logger_service_1 = require("../../../../../../../../../../src/common/logger/logger.service");
const USER_SAFE_MESSAGES = {
    DATABASE_ERROR: 'Service temporarily unavailable. Please try again.',
    AUTH_INTERNAL_ERROR: 'Authentication failed. Please try again.',
    TOKEN_GENERATION_ERROR: 'Login could not be completed. Please try again.',
};
let AuthController = class AuthController {
    constructor(authService, appLogger) {
        this.authService = authService;
        this.appLogger = appLogger;
    }
    async login(req, res, body) {
        const log = this.appLogger.forContext('AuthController', 'login', {
            email: body.username,
            ip: req.ip ?? req.socket?.remoteAddress ?? 'unknown',
        });
        log.info('Request received');
        try {
            const { username, password } = body;
            const response = await this.authService.login(username, password);
            if (!response.success) {
                log.warn(`Auth rejected — ${response.message}`);
                return (0, response_util_1.failedRes)(res, response.message);
            }
            res.cookie('accessToken', response.data?.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000,
            });
            res.cookie('refreshToken', response.data?.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.cookie('permissions', response.data?.user.permissions, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000,
            });
            log.info('Response sent successfully');
            return (0, response_util_1.successRes)(res, response.message, response.data);
        }
        catch (error) {
            log.error('Unhandled error in login', error);
            return (0, response_util_1.errorRes)(res, error);
        }
    }
    async register(req, res, body) {
        const log = this.appLogger.forContext('AuthController', 'register', {
            email: body.email,
            ip: req.ip ?? req.socket?.remoteAddress ?? 'unknown',
        });
        log.info('Request received');
        try {
            const { first_name, last_name, email, phone, password } = body;
            const response = await this.authService.register(first_name, last_name, email, phone, password);
            if (!response.success) {
                log.warn(`Registration rejected — ${response.message}`);
                return (0, response_util_1.failedRes)(res, response.message);
            }
            log.info('Registration response sent successfully');
            return (0, response_util_1.successRes)(res, response.message, response.data);
        }
        catch (error) {
            const errMessage = error instanceof Error ? error.message : String(error);
            const userMessage = USER_SAFE_MESSAGES[errMessage] ?? 'An unexpected error occurred.';
            log.error('Unhandled error in register', error);
            return (0, response_util_1.errorRes)(res, userMessage);
        }
    }
    async logout(req, res) {
        const log = this.appLogger.forContext('AuthController', 'logout', {
            ip: req.ip ?? req.socket?.remoteAddress ?? 'unknown',
        });
        log.info('Logout request received');
        try {
            const response = await this.authService.logout();
            if (!response.success) {
                log.warn(`Logout failed — ${response.message}`);
                return (0, response_util_1.failedRes)(res, response.message);
            }
            res.clearCookie('accessToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
            });
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
            });
            res.clearCookie('permissions', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
            });
            log.info('Logout successful');
            return (0, response_util_1.successRes)(res, response.message, null);
        }
        catch (error) {
            log.error('Unhandled error in logout', error);
            return (0, response_util_1.errorRes)(res, error);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/register'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, typeof (_a = typeof logger_service_1.AppLogger !== "undefined" && logger_service_1.AppLogger) === "function" ? _a : Object])
], AuthController);
//# sourceMappingURL=auth.controller.js.map