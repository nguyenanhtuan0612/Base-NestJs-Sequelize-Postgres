"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionWithMessage = void 0;
const common_1 = require("@nestjs/common");
class ExceptionWithMessage extends common_1.HttpException {
    constructor(error, status, message) {
        super(error.detail, status);
        this.detail = error.detail || null;
        this.code = error.code || 999;
        this.message = message || error.message || `Something wen't wrong`;
    }
}
exports.ExceptionWithMessage = ExceptionWithMessage;
//# sourceMappingURL=HttpException.js.map