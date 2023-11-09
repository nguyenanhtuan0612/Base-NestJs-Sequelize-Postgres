"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSqlModule = void 0;
const tslib_1 = require("tslib");
const config_1 = require("../config");
//import entities from '@/entities';
const common_1 = require("@nestjs/common");
const config_2 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
let PostgreSqlModule = class PostgreSqlModule {
};
exports.PostgreSqlModule = PostgreSqlModule;
exports.PostgreSqlModule = PostgreSqlModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_2.ConfigModule],
                useFactory: async () => ({
                    dialect: 'postgres',
                    host: (0, config_1.appConfigs)().postgres.host,
                    port: (0, config_1.appConfigs)().postgres.port,
                    username: (0, config_1.appConfigs)().postgres.username,
                    password: (0, config_1.appConfigs)().postgres.password,
                    database: (0, config_1.appConfigs)().postgres.database,
                    autoLoadModels: (0, config_1.appConfigs)().postgres.autoLoadModels,
                    synchronize: (0, config_1.appConfigs)().postgres.synchronize,
                    logging: false,
                    dialectOptions: {
                        timeout: 8000,
                    },
                    //models: entities,
                    hooks: {
                        beforeCount: function (options) {
                            if (!this._scope.include) {
                                options.subQuery = false;
                            }
                            if (this._scope.include &&
                                this._scope.include.length > 0) {
                                options.distinct = true;
                                options.col =
                                    this._scope.col ||
                                        options.col ||
                                        `"${this.options.name.singular}".id`;
                            }
                            if (options.include && options.include.length > 0) {
                                options.include = null;
                            }
                        },
                    },
                }),
                inject: [config_2.ConfigService],
            }),
        ],
    })
], PostgreSqlModule);
//# sourceMappingURL=index.js.map