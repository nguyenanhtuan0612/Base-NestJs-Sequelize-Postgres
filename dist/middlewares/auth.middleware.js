"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const tslib_1 = require("tslib");
const jwt_1 = require("@nestjs/jwt");
const errors_1 = require("../utils/errors");
const common_1 = require("@nestjs/common");
const HttpException_1 = require("../exceptions/HttpException");
const users_dto_1 = require("../dtos/users.dto");
const users_entity_1 = require("../modules/users/entities/users.entity");
let AuthMiddleware = class AuthMiddleware {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async use(req, res, next) {
        try {
            const Authorization = req.headers.authorization
                ? req.headers.authorization.split('Bearer ')[1]
                : null;
            if (Authorization) {
                const tokenDecode = this.jwtService.decode(Authorization);
                const findUser = await users_entity_1.User.findByPk(tokenDecode.sub);
                if (findUser) {
                    req.auth = new users_dto_1.UserResponse(findUser);
                    next();
                }
                else {
                    next(new HttpException_1.ExceptionWithMessage(errors_1.errors.LOGIN_ERROR_UNAUTHORIZE, 401, 'Wrong authentication token'));
                }
            }
            else {
                req.auth = null;
                next();
            }
        }
        catch (error) {
            next(new HttpException_1.ExceptionWithMessage(errors_1.errors.LOGIN_ERROR_UNAUTHORIZE, 401, 'Wrong authentication token'));
        }
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [jwt_1.JwtService])
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map