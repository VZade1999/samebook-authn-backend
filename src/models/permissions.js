"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = void 0;
const Sequelize = require("sequelize");
const sequelize_1 = require("sequelize");
class permissions extends sequelize_1.Model {
    static initModel(sequelize) {
        return permissions.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING(150),
                allowNull: false,
                unique: true,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        }, {
            sequelize,
            tableName: 'permissions',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'name',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'name' }],
                },
            ],
        });
    }
}
exports.permissions = permissions;
//# sourceMappingURL=permissions.js.map