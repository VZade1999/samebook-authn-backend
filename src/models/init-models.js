"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companies = exports.role_permissions = exports.permissions = exports.user_roles = exports.roles = exports.users = void 0;
exports.initModels = initModels;
const users_1 = require("./users");
Object.defineProperty(exports, "users", { enumerable: true, get: function () { return users_1.users; } });
const roles_1 = require("./roles");
Object.defineProperty(exports, "roles", { enumerable: true, get: function () { return roles_1.roles; } });
const user_roles_1 = require("./user.roles");
Object.defineProperty(exports, "user_roles", { enumerable: true, get: function () { return user_roles_1.user_roles; } });
const permissions_1 = require("./permissions");
Object.defineProperty(exports, "permissions", { enumerable: true, get: function () { return permissions_1.permissions; } });
const role_permissions_1 = require("./role.permissions");
Object.defineProperty(exports, "role_permissions", { enumerable: true, get: function () { return role_permissions_1.role_permissions; } });
const companies_1 = require("./companies");
Object.defineProperty(exports, "companies", { enumerable: true, get: function () { return companies_1.companies; } });
function initModels(sequelize) {
    const users = users_1.users.initModel(sequelize);
    const roles = roles_1.roles.initModel(sequelize);
    const user_roles = user_roles_1.user_roles.initModel(sequelize);
    const permission = permissions_1.permissions.initModel(sequelize);
    const role_permissions = role_permissions_1.role_permissions.initModel(sequelize);
    const companies = companies_1.companies.initModel(sequelize);
    users.hasMany(user_roles, { as: 'user_roles', foreignKey: 'user_id' });
    user_roles.belongsTo(users, { as: 'user', foreignKey: 'user_id' });
    roles.hasMany(user_roles, { as: 'user_roles', foreignKey: 'role_id' });
    user_roles.belongsTo(roles, { as: 'role', foreignKey: 'role_id' });
    roles.hasMany(role_permissions, {
        as: 'role_permissions',
        foreignKey: 'role_id',
    });
    role_permissions.belongsTo(roles, { as: 'role', foreignKey: 'role_id' });
    permission.hasMany(role_permissions, {
        as: 'role_permissions',
        foreignKey: 'permission_id',
    });
    role_permissions.belongsTo(permission, {
        as: 'permission',
        foreignKey: 'permission_id',
    });
    companies.hasMany(roles, {
        as: 'roles',
        foreignKey: 'company_id',
    });
    roles.belongsTo(companies, {
        as: 'company',
        foreignKey: 'company_id',
    });
    companies.hasMany(users, {
        as: 'users',
        foreignKey: 'company_id',
    });
    users.belongsTo(companies, {
        as: 'company',
        foreignKey: 'company_id',
    });
    return {
        users: users,
        roles: roles,
        user_roles: user_roles,
        role_permissions,
        permission: permission,
        companies: companies,
    };
}
//# sourceMappingURL=init-models.js.map