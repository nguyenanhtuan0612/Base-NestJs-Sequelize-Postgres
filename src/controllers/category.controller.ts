import { CategoryService } from '@/services/category.service';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    async create(@Body() body: any, @Res() res: any) {
        try {
            const rs = await this.categoryService.create(body);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }
    @Get()
    async findAll(@Req() req: any, @Res() res: any) {
        try {
            const { options } = req;
            const rs = await this.categoryService.findAll(options, req, res);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }
}
