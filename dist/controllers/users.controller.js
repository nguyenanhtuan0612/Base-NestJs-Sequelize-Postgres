"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const users_dto_1 = require("@dtos/users.dto");
const common_1 = require("@nestjs/common");
const users_service_1 = require("../services/users.service");
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
};
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_dto_1.CreateUserDto !== "undefined" && users_dto_1.CreateUserDto) === "function" ? _a : Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
UsersController = tslib_1.__decorate([
    (0, common_1.Controller)('users'),
    tslib_1.__metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.default = UsersController;
//# sourceMappingURL=users.controller.js.map