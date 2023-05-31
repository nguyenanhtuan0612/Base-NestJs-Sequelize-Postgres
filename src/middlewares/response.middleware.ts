import { Request, Response, NextFunction } from 'express';
import { Model } from 'sequelize-typescript';
import { FindAndCountOptions as BaseFindAndCountOptions } from 'sequelize';

const sequelizePaginationMiddleware = <T extends Model>(
    model: typeof Model & { new (): T },
    options: BaseFindAndCountOptions<T>,
    hiddenFields: string[],
    include?: any[],
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = Number(req.query.page) || 1;
            const perPage = Number(req.query.perPage) || 10;

            // apply pagination
            options.limit = perPage;
            options.offset = (page - 1) * perPage;

            // exclude hidden fields
            const attributes = Object.keys(model.getAttributes()).filter(
                (attribute) => {
                    return !hiddenFields.includes(attribute);
                },
            );

            options.attributes = attributes;

            // include associations
            if (include) {
                options.include = include;
            }

            // execute the query and count the results
            const { rows, count } = await model.findAndCountAll(options);
            // generate the response object with pagination data
            const totalPages = Math.ceil(count / perPage);
            const nextPage = page < totalPages ? page + 1 : null;
            const prevPage = page > 1 ? page - 1 : null;

            res.json({
                data: rows,
                pagination: {
                    total: count,
                    totalPages,
                    currentPage: page,
                    nextPage,
                    prevPage,
                },
            });
        } catch (error) {
            next(error);
        }
    };
};

export default sequelizePaginationMiddleware;
