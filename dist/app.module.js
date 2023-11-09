"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("./config");
const _databases_1 = require("./databases");
const common_1 = require("@nestjs/common");
const config_2 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const query_middleware_1 = require("./middlewares/query.middleware");
const users_module_1 = require("./modules/users/users.module");
const ENV = process.env.NODE_ENV;
console.log(ENV);
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('*');
        consumer
            .apply(query_middleware_1.QueryMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.GET });
    }
    constructor() {
        //console.log(appConfigs());
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_2.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_1.appConfigs, config_1.authConfigs],
                envFilePath: !ENV ? '.env' : `.env.${ENV}`,
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_2.ConfigModule],
                useFactory: async () => ({
                    secret: (0, config_1.authConfigs)().jwtSecretKey,
                }),
                inject: [config_2.ConfigService],
            }),
            _databases_1.PostgreSqlModule,
            users_module_1.UsersModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [jwt_strategy_1.JwtStrategy, app_service_1.AppService],
    }),
    tslib_1.__metadata("design:paramtypes", [])
], AppModule);
//# sourceMappingURL=app.module.js.map