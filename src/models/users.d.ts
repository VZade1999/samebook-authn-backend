import * as Sequelize from 'sequelize';
import { Model, Optional } from 'sequelize';
export interface usersAttributes {
    id: number;
    company_id: number;
    first_name?: string;
    last_name?: string;
    email: string;
    phone?: string;
    password: string;
    is_active?: number;
    last_login?: Date;
    created_at?: Date;
    updated_at?: Date;
}
export type usersPk = 'id';
export type usersId = users[usersPk];
export type usersOptionalAttributes = 'id' | 'first_name' | 'last_name' | 'phone' | 'is_active' | 'last_login' | 'created_at' | 'updated_at';
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;
export declare class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
    id: number;
    company_id: number;
    first_name?: string;
    last_name?: string;
    email: string;
    phone?: string;
    password: string;
    is_active?: number;
    last_login?: Date;
    created_at?: Date;
    updated_at?: Date;
    static initModel(sequelize: Sequelize.Sequelize): typeof users;
}
