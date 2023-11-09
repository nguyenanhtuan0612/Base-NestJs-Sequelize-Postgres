"use strict";
var AllExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionFilter = void 0;
const tslib_1 = require("tslib");
const errors_1 = require("../utils/errors");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const HttpException_1 = require("./HttpException");
let AllExceptionFilter = AllExceptionFilter_1 = class AllExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(AllExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        // Handling error message and logging
        this.handleLogger(exception);
        // Response to client
        AllExceptionFilter_1.handleResponse(exception, ctx);
    }
    static handleResponse(error, ctx) {
        let message = 'Something went wrong';
        let status = 400;
        let detail = {};
        let code = 999;
        const response = ctx.getResponse();
        switch (true) {
            case error instanceof common_1.HttpException:
                const exception = error;
                const errRes = exception.getResponse();
                detail = errRes;
                if (errRes['message']) {
                    detail = errRes['message'];
                }
                status = exception.getStatus();
                message = '';
                if (exception instanceof HttpException_1.ExceptionWithMessage) {
                    const exceptionMsg = error;
                    message = exceptionMsg.message;
                    code = exceptionMsg.code;
                }
                break;
            case error instanceof sequelize_1.BaseError:
                const baseErr = error;
                code = errors_1.errors.SEQUELIZE_ERROR.code;
                message = baseErr.message;
                detail = error.errors || '';
                status = common_1.HttpStatus.BAD_REQUEST;
                break;
            case error instanceof Error:
                const err = error;
                if (err.name == 'ENOENT') {
                    status = common_1.HttpStatus.NOT_FOUND;
                }
                message = err.message;
                break;
        }
        response.status(status).json({ code, message, detail });
    }
    handleLogger(exception) {
        let message = 'Internal Server Error';
        switch (true) {
            case exception instanceof common_1.HttpException:
                message = JSON.stringify(exception.getResponse());
                break;
            case exception instanceof sequelize_1.BaseError:
                message = JSON.stringify(exception.errors);
                break;
            case exception instanceof Error:
                message = exception.message;
                break;
            case typeof exception == 'number':
                message = `ErrorCode: ${exception}`;
                break;
        }
        this.logger.error(message);
    }
};
exports.AllExceptionFilter = AllExceptionFilter;
exports.AllExceptionFilter = AllExceptionFilter = AllExceptionFilter_1 = tslib_1.__decorate([
    (0, common_1.Catch)(),
    tslib_1.__metadata("design:paramtypes", [])
], AllExceptionFilter);
//# sourceMappingURL=exception.js.map