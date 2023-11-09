"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
const jwt_guard_1 = require("../../../guards/jwt.guard");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../services/auth.service");
const users_dto_1 = require("../../../dtos/users.dto");
let AuthController = class AuthController {
    constructor(service) {
        this.service = service;
    }
    async profile(res, req) {
        try {
            return res.status(200).json(req.auth);
        }
        catch (error) {
            throw error;
        }
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
    async login(res, dto) {
        try {
            const rs = await this.service.login(dto);
            return res.status(200).json(rs);
        }
        catch (error) {
            throw error;
        }
    }
    async changePassword(res, req, dto) {
        try {
            const rs = await this.service.changePassword(req.auth.id, dto);
            return res.status(200).json(rs);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, swagger_1.ApiBearerAuth)('authorization'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "profile", null);
tslib_1.__decorate([
    (0, common_1.Post)('/register'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, users_dto_1.RegisterDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Post)('/login'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, users_dto_1.LoginDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, swagger_1.ApiBearerAuth)('authorization'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/changePassword'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, users_dto_1.ChangePasswordDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('Authoriztion'),
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map