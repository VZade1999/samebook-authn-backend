"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const config_1 = require("@nestjs/config");
const sequelize_1 = require("sequelize");
const init_models_1 = require("../models/init-models");
const NODE_ENV = process.env.NODE_ENV;
exports.databaseProviders = [
    {
        inject: [config_1.ConfigService],
        provide: 'DATABASE_CONNECTION',
        useFactory: async (config) => {
            try {
                console.log('SSM Config FROM ECS', {
                    name: config.get('DB_NAME'),
                    user: config.get('DB_USER'),
                    pass: config.get('DB_PASS'),
                    host: config.get('DB_HOST'),
                });
                const sequelize = new sequelize_1.Sequelize(config.get('DB_NAME') || '', config.get('DB_USER') || '', config.get('DB_PASS') || '', {
                    dialect: config.get('DB_DIALECT') || 'mysql',
                    host: config.get('DB_HOST'),
                    port: config.get('DB_PORT') || 3306,
                    define: {
                        timestamps: true,
                    },
                    pool: {
                        max: 5,
                        min: 0,
                        idle: 20000,
                    },
                });
                const db = (0, init_models_1.initModels)(sequelize);
                return { db, sequelize };
            }
            catch (error) {
                throw error;
            }
        },
    },
];
//# sourceMappingURL=database.provider.js.map