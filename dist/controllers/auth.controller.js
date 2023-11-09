"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
const auth_service_1 = require("../services/auth.service");
const users_dto_1 = require("@dtos/users.dto");
const common_1 = require("@nestjs/common");
let AuthController = class AuthController {
    constructor(service) {
        this.service = service;
    }
    async create(res, registerDto) {
        try {
            const rs = await this.service.register(registerDto);
            return res.status(200).json(rs);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, common_1.Post)('/register'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof users_dto_1.RegisterDto !== "undefined" && users_dto_1.RegisterDto) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map