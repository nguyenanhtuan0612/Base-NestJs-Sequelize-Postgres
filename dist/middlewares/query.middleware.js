"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryMiddleware = void 0;
const tslib_1 = require("tslib");
const validators_1 = require("../utils/validators");
const sequelize_1 = require("sequelize");
const errors_1 = require("../utils/errors");
const common_1 = require("@nestjs/common");
const HttpException_1 = require("../exceptions/HttpException");
const query_dto_1 = require("../dtos/query.dto");
const generateWhere = (filter) => {
    const { prop, operator, value } = filter;
    //console.log(operator);
    switch (operator) {
        case 'eq': {
            return { [prop]: value };
        }
        case 'not': {
            return { [prop]: { [sequelize_1.Op.not]: value } };
        }
        case 'lt': {
            return { [prop]: { [sequelize_1.Op.lt]: value } };
        }
        case 'lte': {
            return { [prop]: { [sequelize_1.Op.lte]: value } };
        }
        case 'gt': {
            return { [prop]: { [sequelize_1.Op.gt]: value } };
        }
        case 'gte': {
            return { [prop]: { [sequelize_1.Op.gte]: value } };
        }
        case 'like': {
            return { [prop]: { [sequelize_1.Op.like]: `%${value}%` } };
        }
        case 'iLike': {
            return { [prop]: { [sequelize_1.Op.iLike]: `%${value}%` } };
        }
        case 'between': {
            const strVal = value;
            return { [prop]: { [sequelize_1.Op.between]: JSON.parse(strVal) } };
        }
        case 'in': {
            if (!Array.isArray(value)) {
                return { [prop]: value };
            }
            return { [prop]: { [sequelize_1.Op.in]: value } };
        }
        case 'notIn': {
            if (!Array.isArray(value)) {
                return { [prop]: value };
            }
            return { [prop]: { [sequelize_1.Op.notIn]: value } };
        }
        default: {
            return { [prop]: value };
        }
    }
};
const generateOrder = (order) => {
    const { prop, direction } = order;
    return [prop, direction.toUpperCase()];
};
let QueryMiddleware = class QueryMiddleware {
    async use(req, res, next) {
        try {
            const { limit, offset, filter, order } = req.query;
            const options = {
                offset: Number(offset) || 0,
                limit: Number(limit) || 10,
                where: {},
                order: [],
            };
            const filterArr = filter ? JSON.parse(filter.toString()) : [];
            if (Array.isArray(filterArr)) {
                for (const iterator of filterArr) {
                    const { valid, message } = await (0, validators_1.validation)(query_dto_1.Filter, iterator);
                    if (!valid) {
                        next(new HttpException_1.ExceptionWithMessage(errors_1.errors.FILTER_INVALID, 400, 'Filter error: ' + message));
                    }
                    options.where = Object.assign(options.where, generateWhere(iterator));
                }
            }
            const orderArr = order ? JSON.parse(order.toString()) : [];
            if (Array.isArray(orderArr)) {
                for (const iterator of orderArr) {
                    const { valid, message } = await (0, validators_1.validation)(query_dto_1.Order, iterator);
                    if (!valid) {
                        next(new HttpException_1.ExceptionWithMessage(errors_1.errors.ORDER_INVALID, 400, 'Order error: ' + message));
                    }
                    options.order.push(generateOrder(iterator));
                }
            }
            req.options = options;
            next();
        }
        catch (error) {
            next(error);
        }
    }
};
exports.QueryMiddleware = QueryMiddleware;
exports.QueryMiddleware = QueryMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)()
], QueryMiddleware);
//# sourceMappingURL=query.middleware.js.map