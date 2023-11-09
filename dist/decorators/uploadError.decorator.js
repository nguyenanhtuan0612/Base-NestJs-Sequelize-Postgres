"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadError = void 0;
const common_1 = require("@nestjs/common");
exports.UploadError = (0, common_1.createParamDecorator)((data, context) => {
    const { uploadError } = context.switchToHttp().getRequest();
    return uploadError;
});
//# sourceMappingURL=uploadError.decorator.js.map