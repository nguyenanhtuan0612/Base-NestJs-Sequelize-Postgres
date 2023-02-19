import { LoginDto, LoginWithOTPDto } from '@/dtos/login.dto';
import { ExceptionWithMessage } from '@/exceptions/HttpException';
import { AuthService } from '@/services/auth.service';
import { UsersService } from '@/services/users.service';
import { errors } from '@/utils/errors';
import { RegisterDto } from '@dtos/users.dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly service: AuthService,
        private readonly userService: UsersService,
    ) {}

    @Post('/register')
    async create(@Res() res: Response, @Body() registerDto: RegisterDto) {
        try {
            const rs = await this.service.register(registerDto);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }

    @Post('/generateOTP')
    async genOTP(@Res() res: Response, @Body() body: { phone_number: string }) {
        try {
            const rs = await this.service.generateOTP(body);
            return res.status(200).json(rs);
        } catch (error) {
            throw error;
        }
    }

    @Post('loginNotPass')
    async loginOTP(@Res() res: any, @Body() loginDto: LoginWithOTPDto) {
        try {
            const user = await this.service.loginNotPass(loginDto);
            if (user) {
                const rs = await this.service.generateJwtToken(user);
                return res.status(200).json(rs);
            }
            throw new ExceptionWithMessage(
                errors.INCORRECT_INFO.detail,
                400,
                errors.INCORRECT_INFO.code,
            );
        } catch (error) {
            throw error;
        }
    }

    @Post('login')
    async login(@Res() res: any, @Body() loginDto: LoginDto) {
        try {
            const user = await this.service.validateUser(loginDto);
            if (user) {
                const rs = await this.service.generateJwtToken(user);
                return res.status(200).json(rs);
            }
            throw new ExceptionWithMessage(
                errors.INCORRECT_INFO.detail,
                400,
                errors.INCORRECT_INFO.code,
            );
        } catch (error) {
            throw error;
        }
    }
}
