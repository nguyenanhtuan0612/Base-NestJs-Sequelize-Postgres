import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
const specific = ['like', 'notLike', 'iLike', 'notILike'];
const operators = {
    '=': Sequelize.Op.eq,
    eq: Sequelize.Op.eq,
    '>': Sequelize.Op.gt,
    gt: Sequelize.Op.gt,
    '>=': Sequelize.Op.gte,
    gte: Sequelize.Op.gte,
    '<': Sequelize.Op.lt,
    lt: Sequelize.Op.lt,
    '<=': Sequelize.Op.lte,
    lte: Sequelize.Op.lte,
    '!=': Sequelize.Op.ne,
    ne: Sequelize.Op.ne,
    in: Sequelize.Op.in,
    notIn: Sequelize.Op.notIn,
    like: Sequelize.Op.like,
    notLike: Sequelize.Op.notLike,
    iLike: Sequelize.Op.iLike,
    notILike: Sequelize.Op.notILike,
    regexp: Sequelize.Op.regexp,
    notRegexp: Sequelize.Op.notRegexp,
    between: Sequelize.Op.between,
};

@Injectable()
export class QueryMiddleware implements NestMiddleware {
    use(req: any, res: Response, next: NextFunction) {
        const paginate = this.paginate(req);
        const where = this.where(req);
        const order = this.sort(req);

        Object.assign(req, {
            options: Object.assign({}, paginate, where, order),
        });
        next();
    }

    private where(req) {
        let { filter } = req.query;
        const where = {};

        if (this.isJson(filter)) {
            filter = JSON.parse(filter);
            if (Array.isArray(filter)) {
                filter.forEach((field) => {
                    const { operator, prop } = field;
                    let { value } = field;

                    if (typeof value === 'string' || value instanceof String) {
                        value = value.replace(/%/g, '\\%');
                        value = value.replace(/\\/g, '\\');
                    }

                    if (prop && operator && operators[operator]) {
                        if (specific.indexOf(operator) >= 0) {
                            value = `%${value}%`;
                        }

                        Object.assign(where, {
                            [prop]: {
                                [operators[operator]]: value,
                            },
                        });
                    }
                    if (operator === 'search') {
                        const value = {
                            [Op.iLike]: '%' + field.value.toString() + '%',
                        };
                        const fields = field.prop.split(',');
                        const filters = {};
                        fields.forEach((item: any) => (filters[item] = value));
                        Object.assign(where, { [Op.or]: filters });
                    }
                });
            }
        }

        return { where };
    }

    private sort(req) {
        let { sort } = req.query;
        const order = [];

        if (!this.isJson(sort)) {
            return order;
        }

        sort = JSON.parse(sort);

        if (Array.isArray(sort)) {
            sort.forEach((field) => {
                order.push([field.prop, field.direction]);
            });
        }

        return {
            order,
        };
    }

    private paginate(req) {
        const { limit, start } = req.query;
        const paginate = { limit: 10, offset: 0, subQuery: false };
        if (limit) {
            paginate.limit = limit;
            paginate.subQuery = true;
        } else paginate.limit = 10;

        if (start != undefined) {
            paginate.offset = start;
        }
        if (paginate.limit > 20) {
            paginate.limit = 20;
        }
        return paginate;
    }

    private isJson(str) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }
}
