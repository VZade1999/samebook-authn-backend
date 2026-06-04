import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
export interface rolesAttributes {
    id: number;
    company_id?: number;
    name: string;
    description?: string;
    is_system?: number;
    created_at?: Date;
    updated_at?: Date;
}
export type rolesPk = 'id';
export type rolesId = roles[rolesPk];
export type rolesOptionalAttributes = 'id' | 'company_id' | 'description' | 'is_system' | 'created_at' | 'updated_at';
export type rolesCreationAttributes = Optional<rolesAttributes, rolesOptionalAttributes>;
export declare class roles extends Model<rolesAttributes, rolesCreationAttributes> implements rolesAttributes {
    id: number;
    company_id?: number;
    name: string;
    description?: string;
    is_system?: number;
    created_at?: Date;
    updated_at?: Date;
    static initModel(sequelize: Sequelize.Sequelize): typeof roles;
}
