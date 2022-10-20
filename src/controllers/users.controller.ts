import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { IUser } from '@interfaces/users.interface';
import { Body, Post, Res } from '@nestjs/common';
import { errorHandler } from '@/utils/errors';
import { UsersService } from '@/services/users.service';

class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Res() res: any) {
        try {
            const rs = await this.usersService.create(createUserDto);
            return res.status(200).json(rs);
        } catch (error) {
            return res.status(error.status || 400).json(errorHandler(error));
        }
    }
}

export default UsersController;
