"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_controller_1 = tslib_1.__importDefault(require("./controllers/users.controller"));
const users_entity_1 = require("./entities/users.entity");
const users_service_1 = require("./services/users.service");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([users_entity_1.User])],
        controllers: [users_controller_1.default],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map