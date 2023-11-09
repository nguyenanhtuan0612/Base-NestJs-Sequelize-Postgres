import { AuthService } from '@/services/auth.service';
import { RegisterDto } from '@dtos/users.dto';
import { Response } from 'express';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    create(res: Response, registerDto: RegisterDto): Promise<Response<any, Record<string, any>>>;
}
