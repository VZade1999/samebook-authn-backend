"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.role_permissions = void 0;
const Sequelize = require("sequelize");
const sequelize_1 = require("sequelize");
class role_permissions extends sequelize_1.Model {
    static initModel(sequelize) {
        return role_permissions.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            role_id: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'roles',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            permission_id: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'permissions',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        }, {
            sequelize,
            tableName: 'role_permissions',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'role_id',
                    using: 'BTREE',
                    fields: [{ name: 'role_id' }],
                },
                {
                    name: 'permission_id',
                    using: 'BTREE',
                    fields: [{ name: 'permission_id' }],
                },
            ],
        });
    }
}
exports.role_permissions = role_permissions;
//# sourceMappingURL=role.permissions.js.map