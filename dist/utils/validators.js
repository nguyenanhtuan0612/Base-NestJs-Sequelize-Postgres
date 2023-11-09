"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = exports.IsValueFilter = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let IsValueFilter = class IsValueFilter {
    validate(data) {
        return (typeof data === 'number' ||
            typeof data === 'string' ||
            Array.isArray(data));
    }
    defaultMessage() {
        return '($value) must be number, string or array';
    }
};
exports.IsValueFilter = IsValueFilter;
exports.IsValueFilter = IsValueFilter = tslib_1.__decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'string-or-number', async: false })
], IsValueFilter);
const validation = async (type, value, skipMissingProperties = false, whitelist = true, forbidNonWhitelisted = true) => {
    return (0, class_validator_1.validate)((0, class_transformer_1.plainToClass)(type, value), {
        skipMissingProperties,
        whitelist,
        forbidNonWhitelisted,
    }).then((errors) => {
        if (errors.length > 0) {
            const message = errors
                .map((error) => Object.values(error.constraints))
                .join(', ');
            return { valid: false, message };
        }
        else {
            return { valid: true, message: 'null' };
        }
    });
};
exports.validation = validation;
//# sourceMappingURL=validators.js.map