"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = void 0;
const Sequelize = require("sequelize");
const sequelize_1 = require("sequelize");
class roles extends sequelize_1.Model {
    static initModel(sequelize) {
        return roles.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            company_id: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: 'companies',
                    key: 'id',
                },
            },
            name: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            is_system: {
                type: sequelize_1.DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 0,
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
            tableName: 'roles',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'company_id',
                    using: 'BTREE',
                    fields: [{ name: 'company_id' }],
                },
            ],
        });
    }
}
exports.roles = roles;
//# sourceMappingURL=roles.js.map