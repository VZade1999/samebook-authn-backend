import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
export interface permissionsAttributes {
    id: number;
    name: string;
    description?: string;
    created_at?: Date;
}
export type permissionsPk = 'id';
export type permissionsId = permissions[permissionsPk];
export type permissionsOptionalAttributes = 'id' | 'description' | 'created_at';
export type permissionsCreationAttributes = Optional<permissionsAttributes, permissionsOptionalAttributes>;
export declare class permissions extends Model<permissionsAttributes, permissionsCreationAttributes> implements permissionsAttributes {
    id: number;
    name: string;
    description?: string;
    created_at?: Date;
    static initModel(sequelize: Sequelize.Sequelize): typeof permissions;
}
