"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.Filter = void 0;
const tslib_1 = require("tslib");
const validators_1 = require("../utils/validators");
const class_validator_1 = require("class-validator");
class Filter {
}
exports.Filter = Filter;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Filter.prototype, "prop", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Filter.prototype, "operator", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Validate)(validators_1.IsValueFilter),
    tslib_1.__metadata("design:type", Object)
], Filter.prototype, "value", void 0);
class Order {
}
exports.Order = Order;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "prop", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsIn)(['asc', 'desc']),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "direction", void 0);
//# sourceMappingURL=query.dto.js.map