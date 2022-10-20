import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { RegisterDto } from '@/dtos/users.dto';
import { UsersService } from './users.service';
import { errors } from '@/utils/errors';
import { HttpException } from '@/exceptions/HttpException';
import { User } from '@/entities/users.entity';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

    async register(registerDto: RegisterDto) {
        const check = await this.userService.findByEmail(registerDto.email);

        if (check)
            throw new HttpException(
                400,
                errors.EMAIL_EXIST.message,
                errors.EMAIL_EXIST.code,
                errors.EMAIL_EXIST.detail,
            ); // error
        const user = new User();
        user.email = registerDto.email;

        const salt = await genSalt(10);
        user.password = await hash(registerDto.password, salt);
        const userData = await user.save();

        return userData;
    }
}
