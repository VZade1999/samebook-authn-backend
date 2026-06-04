import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
export interface role_permissionsAttributes {
    id: number;
    role_id: number;
    permission_id: number;
    created_at?: Date;
}
export type role_permissionsPk = 'id';
export type role_permissionsId = role_permissions[role_permissionsPk];
export type role_permissionsOptionalAttributes = 'id' | 'created_at';
export type role_permissionsCreationAttributes = Optional<role_permissionsAttributes, role_permissionsOptionalAttributes>;
export declare class role_permissions extends Model<role_permissionsAttributes, role_permissionsCreationAttributes> implements role_permissionsAttributes {
    id: number;
    role_id: number;
    permission_id: number;
    created_at?: Date;
    static initModel(sequelize: Sequelize.Sequelize): typeof role_permissions;
}
