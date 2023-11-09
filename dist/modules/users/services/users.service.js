"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const tslib_1 = require("tslib");
const users_dto_1 = require("../../../dtos/users.dto");
const HttpException_1 = require("../../../exceptions/HttpException");
const errors_1 = require("../../../utils/errors");
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const users_entity_1 = require("../entities/users.entity");
let UsersService = class UsersService {
    async create(createUserDto) {
        const user = new users_entity_1.User();
        user.email = createUserDto.email;
        const salt = await (0, bcrypt_1.genSalt)(10);
        user.password = await (0, bcrypt_1.hash)(createUserDto.password, salt);
        user.role = createUserDto.role;
        const userData = await user.save();
        return userData;
    }
    async detail(id) {
        const userData = await users_entity_1.User.findByPk(id);
        if (!userData) {
            throw new HttpException_1.ExceptionWithMessage(errors_1.errors.USER_NOT_FOUND, 404);
        }
        return new users_dto_1.UserResponse(userData);
    }
    async banUser(id) {
        const userData = await users_entity_1.User.findByPk(id);
        if (!userData) {
            throw new HttpException_1.ExceptionWithMessage(errors_1.errors.USER_NOT_FOUND, 404);
        }
        userData.active = false;
        await userData.save();
        return new users_dto_1.UserResponse(userData);
    }
    async unBanUser(id) {
        const userData = await users_entity_1.User.findByPk(id);
        if (!userData) {
            throw new HttpException_1.ExceptionWithMessage(errors_1.errors.USER_NOT_FOUND, 404);
        }
        userData.active = true;
        await userData.save();
        return new users_dto_1.UserResponse(userData);
    }
    async update(id, dto) {
        let userData = await users_entity_1.User.findByPk(id);
        if (!userData) {
            throw new HttpException_1.ExceptionWithMessage(errors_1.errors.USER_NOT_FOUND, 404);
        }
        await users_entity_1.User.update(dto, { where: { id } });
        userData = await users_entity_1.User.findByPk(id);
        return new users_dto_1.UserResponse(userData);
    }
    async list(options) {
        const { limit, offset, where, order } = options;
        const data = await users_entity_1.User.findAndCountAll({
            where,
            limit,
            offset,
            order,
        });
        return data;
    }
    async changeRole(id, dto) {
        const userData = await users_entity_1.User.findByPk(id);
        if (!userData) {
            throw new HttpException_1.ExceptionWithMessage(errors_1.errors.USER_NOT_FOUND, 404);
        }
        userData.role = dto.role;
        await userData.save();
        return new users_dto_1.UserResponse(userData);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map