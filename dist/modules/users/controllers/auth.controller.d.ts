import { RequestWithUserOption } from '@/interfaces/auth.interface';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ChangePasswordDto, LoginDto, RegisterDto } from '@/dtos/users.dto';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    profile(res: Response, req: RequestWithUserOption): Promise<Response<any, Record<string, any>>>;
    create(res: Response, registerDto: RegisterDto): Promise<Response<any, Record<string, any>>>;
    login(res: Response, dto: LoginDto): Promise<Response<any, Record<string, any>>>;
    changePassword(res: Response, req: RequestWithUserOption, dto: ChangePasswordDto): Promise<Response<any, Record<string, any>>>;
}
