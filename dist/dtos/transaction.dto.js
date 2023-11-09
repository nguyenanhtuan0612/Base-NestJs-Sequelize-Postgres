"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyAccountDto = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class BuyAccountDto {
}
exports.BuyAccountDto = BuyAccountDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], BuyAccountDto.prototype, "tiktokAcountId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], BuyAccountDto.prototype, "price", void 0);
//# sourceMappingURL=transaction.dto.js.map