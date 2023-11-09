"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const config_1 = require("../config");
const users_dto_1 = require("../dtos/users.dto");
const HttpException_1 = require("../exceptions/HttpException");
const users_entity_1 = require("../modules/users/entities/users.entity");
const errors_1 = require("../utils/errors");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: (0, config_1.authConfigs)().jwtSecretKey,
        });
        //console.log(authConfigs().jwtSecretKey);
    }
    async validate(payload) {
        const user = await users_entity_1.User.findByPk(payload.sub);
        if (!user) {
            throw new HttpException_1.ExceptionWithMessage(errors_1.errors.LOGIN_ERROR_UNAUTHORIZE, 401, 'Wrong authentication token');
        }
        const data = new users_dto_1.UserResponse(user);
        return JSON.parse(JSON.stringify(data));
    }
}
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map