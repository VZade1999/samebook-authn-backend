import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
export interface companiesAttributes {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    logo?: string;
    is_active?: number;
    created_at?: Date;
    updated_at?: Date;
}
export type companiesPk = 'id';
export type companiesId = companies[companiesPk];
export type companiesOptionalAttributes = 'id' | 'email' | 'phone' | 'address' | 'logo' | 'is_active' | 'created_at' | 'updated_at';
export type companiesCreationAttributes = Optional<companiesAttributes, companiesOptionalAttributes>;
export declare class companies extends Model<companiesAttributes, companiesCreationAttributes> implements companiesAttributes {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    logo?: string;
    is_active?: number;
    created_at?: Date;
    updated_at?: Date;
    static initModel(sequelize: Sequelize.Sequelize): typeof companies;
}
