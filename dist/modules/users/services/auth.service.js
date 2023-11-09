"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const errors_1 = require("../../../utils/errors");
const bcrypt_1 = require("bcrypt");
const HttpException_1 = require("../../../exceptions/HttpException");
const config_1 = require("../../../config");
const jwt_1 = require("@nestjs/jwt");
const users_dto_1 = require("../../../dtos/users.dto");
const users_entity_1 = require("../entities/users.entity");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const check = await users_entity_1.User.findOne({
            where: { email: registerDto.email },
        });
        if (check)
            throw new HttpException_1.ExceptionWithMessage(errors_1.errors.EMAIL_EXIST, 400, 'Register Fail'); // error
        const user = new users_entity_1.User();
        user.email = registerDto.email;
        const salt = await (0, bcrypt_1.genSalt)(10);
        user.password = await (0, bcrypt_1.hash)(registerDto.password, salt);
        const userData = await user.save();
        return new users_dto_1.UserResponse(userData);
    }
    async login(dto) {
        const user = await users_entity_1.User.findOne({
            where: { email: dto.email, active: true },
        });
        if (user) {
            const compareResult = await (0, bcrypt_1.compare)(dto.password, user.password);
            if (compareResult) {
                const payload = {
                    email: user.email,
                    sub: user.id,
                };
                const tokenExpiresIn = (0, config_1.authConfigs)().jwtExpiresIn;
                const accessToken = await this.jwtService.signAsync(payload, {
                    expiresIn: tokenExpiresIn,
                });
                const refreshTokenExpiresIn = (0, config_1.authConfigs)().jwtRefreshExpiresIn;
                const refreshToken = await this.jwtService.signAsync(payload, {
                    secret: (0, config_1.authConfigs)().jwtRefreshTokenKey,
                    expiresIn: refreshTokenExpiresIn,
                });
                return new users_dto_1.UserResponeWithToken(user, {
                    accessToken,
                    refreshToken,
                    tokenExpiresIn,
                    refreshTokenExpiresIn,
                });
            }
            throw new HttpException_1.ExceptionWithMessage(errors_1.errors.USERNAME_PASSWORD_INVALID, 401, 'Login Fail');
        }
        throw new HttpException_1.ExceptionWithMessage(errors_1.errors.USERNAME_PASSWORD_INVALID, 401, 'Login Fail');
    }
    async changePassword(userId, dto) {
        const user = await users_entity_1.User.findOne({
            where: { id: userId },
        });
        if (user) {
            const compareResult = await (0, bcrypt_1.compare)(dto.currentPassword, user.password);
            if (compareResult) {
                const salt = await (0, bcrypt_1.genSalt)(10);
                user.password = await (0, bcrypt_1.hash)(dto.newPassword, salt);
                return new users_dto_1.UserResponse(user);
            }
            throw new HttpException_1.ExceptionWithMessage(errors_1.errors.CURRENT_PASSWORD_NOT_MATCH, 401);
        }
        throw new HttpException_1.ExceptionWithMessage(errors_1.errors.USER_NOT_FOUND, 404);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map