import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
export interface user_rolesAttributes {
    id: number;
    user_id: number;
    role_id: number;
    created_at?: Date;
}
export type user_rolesPk = 'id';
export type user_rolesId = user_roles[user_rolesPk];
export type user_rolesOptionalAttributes = 'id' | 'created_at';
export type user_rolesCreationAttributes = Optional<user_rolesAttributes, user_rolesOptionalAttributes>;
export declare class user_roles extends Model<user_rolesAttributes, user_rolesCreationAttributes> implements user_rolesAttributes {
    id: number;
    user_id: number;
    role_id: number;
    created_at?: Date;
    static initModel(sequelize: Sequelize.Sequelize): typeof user_roles;
}
