"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const tslib_1 = require("tslib");
const users_entity_1 = require("../entities/users.entity");
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
let UsersService = class UsersService {
    async create(createUserDto) {
        const user = new users_entity_1.User();
        user.email = createUserDto.email;
        const salt = await (0, bcrypt_1.genSalt)(10);
        user.password = await (0, bcrypt_1.hash)(createUserDto.password, salt);
        const userData = await user.save();
        return userData;
    }
    async findByEmail(email) {
        return users_entity_1.User.findOne({
            where: { email },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map