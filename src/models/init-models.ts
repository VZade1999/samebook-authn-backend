import type { Sequelize } from 'sequelize';
import { users as _users, users } from './users';
import type { usersAttributes, usersCreationAttributes } from './users';
import { roles as _roles, roles } from './roles';
import type { rolesAttributes, rolesCreationAttributes } from './roles';
import { user_roles as _user_roles } from './user.roles';
import type {
  user_rolesAttributes,
  user_rolesCreationAttributes,
} from './user.roles';
import { permissions as _permissions } from './permissions';
import type { permissionsAttributes } from './permissions';
import {
  role_permissions as _role_permissions,
  role_permissions,
} from './role.permissions';

import type {
  role_permissionsAttributes,
  role_permissionsCreationAttributes,
} from './role.permissions';

import { companies as _companies, companies } from './companies';
import type {
  companiesAttributes,
  companiesCreationAttributes,
} from './companies';

export {
  _users as users,
  _roles as roles,
  _user_roles as user_roles,
  _permissions as permissions,
  _role_permissions as role_permissions,
  _companies as companies,
};

export type {
  usersAttributes,
  rolesAttributes,
  user_rolesAttributes,
  permissionsAttributes,
  role_permissionsAttributes,
  companiesAttributes,
};

export function initModels(sequelize: Sequelize) {
  const users = _users.initModel(sequelize);
  const roles = _roles.initModel(sequelize);
  const user_roles = _user_roles.initModel(sequelize);
  const permission = _permissions.initModel(sequelize);
  const role_permissions = _role_permissions.initModel(sequelize);
  const companies = _companies.initModel(sequelize);

  // users <-> user_roles
  users.hasMany(user_roles, { as: 'user_roles', foreignKey: 'user_id' });
  user_roles.belongsTo(users, { as: 'user', foreignKey: 'user_id' });

  // roles <-> user_roles
  roles.hasMany(user_roles, { as: 'user_roles', foreignKey: 'role_id' });
  user_roles.belongsTo(roles, { as: 'role', foreignKey: 'role_id' });

  // roles <-> role_permissions  ← THIS WAS MISSING
  roles.hasMany(role_permissions, {
    as: 'role_permissions',
    foreignKey: 'role_id',
  });
  role_permissions.belongsTo(roles, { as: 'role', foreignKey: 'role_id' });

  // permissions <-> role_permissions
  permission.hasMany(role_permissions, {
    as: 'role_permissions',
    foreignKey: 'permission_id',
  });
  role_permissions.belongsTo(permission, {
    as: 'permission',
    foreignKey: 'permission_id',
  });

  // companies <-> roles
  companies.hasMany(roles, {
    as: 'roles',
    foreignKey: 'company_id',
  });

  roles.belongsTo(companies, {
    as: 'company',
    foreignKey: 'company_id',
  });

  // companies <-> users
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
