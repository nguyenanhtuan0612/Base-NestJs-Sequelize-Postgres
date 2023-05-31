import { UserService } from '@/services/user.service';
import { CreateUserDto } from '@dtos/users.dto';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Res() res: any) {
        try {
            const rs = await this.userService.create(createUserDto);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }
    @Get()
    async findAll(@Req() req: any, @Res() res: any) {
        try {
            const { options } = req;
            const rs = await this.userService.findAll(options, req, res);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }
}
