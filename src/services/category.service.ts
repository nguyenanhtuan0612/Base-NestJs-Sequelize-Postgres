import { Category } from '@/entities/category.entity';
import { Injectable } from '@nestjs/common';
import sequelizePaginationMiddleware from '@/middlewares/response.middleware';

@Injectable()
export class CategoryService {
    constructor() {}

    async create(body): Promise<Category> {
        try {
            const category = new Category();
            category.name = body.name;
            category.description = body.description;
            category.slug = body.slug;
            await category.save();
            return category;
        } catch (error) {
            throw new Error(`Could not create category: ${error.message}`);
        }
    }
    async findAll(options, req, res) {
        try {
            const hiddenFields = [];
            const include = null;

            await sequelizePaginationMiddleware(
                Category,
                options,
                hiddenFields,
                include,
            )(req, res, () => {});
        } catch (error) {
            throw error;
        }
    }
}
