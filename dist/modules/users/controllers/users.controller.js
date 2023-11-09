"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../../guards/jwt.guard");
const role_guard_1 = require("../../../guards/role.guard");
const constants_1 = require("../../../utils/constants");
const HttpException_1 = require("../../../exceptions/HttpException");
const errors_1 = require("../../../utils/errors");
const users_service_1 = require("../services/users.service");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const users_dto_1 = require("../../../dtos/users.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto, res) {
        try {
            const rs = await this.usersService.create(createUserDto);
            return res.status(200).json(rs);
        }
        catch (error) {
            throw error;
        }
    }
    async list(req, res) {
        try {
            const rs = await this.usersService.list(req.options);
            return res.status(200).json(rs);
        }
        catch (error) {
            throw error;
        }
    }
    async ban(id, res) {
        try {
            const rs = await this.usersService.banUser(id);
            return res.status(200).json(rs);
        }
        catch (error) {
            throw error;
        }
    }
    async unBan(id, res) {
        try {
            const rs = await this.usersService.unBanUser(id);
            return res.status(200).json(rs);
        }
        catch (error) {
            throw error;
        }
    }
    async changeRole(id, res, dto) {
        try {
            const rs = await this.usersService.changeRole(id, dto);
            return res.status(200).json(rs);
        }
        catch (error) {
            throw error;
        }
    }
    async detail(id, res, req) {
        try {
            if (req.auth.role !== constants_1.Role.ADMIN || req.auth.id !== id) {
                throw new HttpException_1.ExceptionWithMessage(errors_1.errors.FORBIDDEN_RESOURCE, 403);
            }
            const rs = await this.usersService.detail(id);
            return res.status(200).json(rs);
        }
        catch (error) {
            throw error;
        }
    }
};
tslib_1.__decorate([
    (0, swagger_1.ApiBearerAuth)('authorization'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([constants_1.Role.ADMIN]),
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [users_dto_1.CreateUserDto, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
tslib_1.__decorate([
    (0, swagger_1.ApiQuery)({
        name: 'filter',
        description: '[{"operator":"search","value":"provai","prop":"email,fullName"},{"operator":"eq","value":"887c1870-3000-4110-9426-89afa8724d69","prop":"id"}]',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sort',
        description: '[{"direction":"DESC","prop":"createdAt"}]',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'offset',
        description: '0',
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        description: '10',
        required: false,
    }),
    (0, swagger_1.ApiBearerAuth)('authorization'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([constants_1.Role.ADMIN]),
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "list", null);
tslib_1.__decorate([
    (0, swagger_1.ApiBearerAuth)('authorization'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([constants_1.Role.ADMIN]),
    (0, common_1.Put)('ban/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "ban", null);
tslib_1.__decorate([
    (0, swagger_1.ApiBearerAuth)('authorization'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([constants_1.Role.ADMIN]),
    (0, common_1.Put)('unBan/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "unBan", null);
tslib_1.__decorate([
    (0, swagger_1.ApiBearerAuth)('authorization'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([constants_1.Role.ADMIN]),
    (0, common_1.Put)('changeRole/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, users_dto_1.ChangeRoleDto]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "changeRole", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('detail/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__param(2, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "detail", null);
UsersController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    tslib_1.__metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.default = UsersController;
//# sourceMappingURL=users.controller.js.map