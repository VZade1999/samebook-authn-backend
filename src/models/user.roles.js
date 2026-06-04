"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_roles = void 0;
const Sequelize = require("sequelize");
const sequelize_1 = require("sequelize");
class user_roles extends sequelize_1.Model {
    static initModel(sequelize) {
        return user_roles.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            user_id: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            role_id: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'roles',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        }, {
            sequelize,
            tableName: 'user_roles',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'user_id',
                    using: 'BTREE',
                    fields: [{ name: 'user_id' }],
                },
                {
                    name: 'role_id',
                    using: 'BTREE',
                    fields: [{ name: 'role_id' }],
                },
            ],
        });
    }
}
exports.user_roles = user_roles;
//# sourceMappingURL=user.roles.js.map