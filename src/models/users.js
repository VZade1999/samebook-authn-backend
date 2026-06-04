"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const Sequelize = require("sequelize");
const sequelize_1 = require("sequelize");
class users extends sequelize_1.Model {
    static initModel(sequelize) {
        return users.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            company_id: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'companies',
                    key: 'id',
                },
            },
            first_name: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true,
            },
            last_name: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: true,
            },
            email: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            phone: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true,
            },
            password: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            is_active: {
                type: sequelize_1.DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 1,
            },
            last_login: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        }, {
            sequelize,
            tableName: 'users',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'email',
                    unique: true,
                    fields: [{ name: 'email' }],
                },
                {
                    name: 'company_id',
                    fields: [{ name: 'company_id' }],
                },
            ],
        });
    }
}
exports.users = users;
//# sourceMappingURL=users.js.map