"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companies = void 0;
const Sequelize = require("sequelize");
const sequelize_1 = require("sequelize");
class companies extends sequelize_1.Model {
    static initModel(sequelize) {
        return companies.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
            },
            phone: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true,
            },
            address: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            logo: {
                type: sequelize_1.DataTypes.STRING(500),
                allowNull: true,
            },
            is_active: {
                type: sequelize_1.DataTypes.TINYINT,
                allowNull: true,
                defaultValue: 1,
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
            tableName: 'companies',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
            ],
        });
    }
}
exports.companies = companies;
//# sourceMappingURL=companies.js.map