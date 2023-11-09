"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const errors_1 = require("../utils/errors");
const users_entity_1 = require("../entities/users.entity");
const bcrypt_1 = require("bcrypt");
const HttpException_1 = require("../exceptions/HttpException");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async register(registerDto) {
        const check = await this.userService.findByEmail(registerDto.email);
        if (check)
            throw new HttpException_1.ExceptionWithMessage(errors_1.errors.EMAIL_EXIST.detail, 400, errors_1.errors.EMAIL_EXIST.code, 'Register Fail'); // error
        const user = new users_entity_1.User();
        user.email = registerDto.email;
        const salt = await (0, bcrypt_1.genSalt)(10);
        user.password = await (0, bcrypt_1.hash)(registerDto.password, salt);
        const userData = await user.save();
        return userData;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map