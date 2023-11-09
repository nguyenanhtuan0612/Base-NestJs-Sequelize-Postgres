import { NextFunction, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser } from '@interfaces/auth.interface';
import { NestMiddleware } from '@nestjs/common';
export declare class AuthMiddleware implements NestMiddleware {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    use(req: RequestWithUser, res: Response, next: NextFunction): Promise<void>;
}
