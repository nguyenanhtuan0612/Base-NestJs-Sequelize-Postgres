import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { User } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { IUser } from '@/interfaces/users.interface';
import { errors } from '@/utils/errors';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}
    async use(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const Authorization =
                req.cookies['Authorization'] ||
                (req.header('Authorization')
                    ? req.header('Authorization').split('Bearer ')[1]
                    : null);

            if (Authorization) {
                const tokenDecode: any = this.jwtService.decode(Authorization);
                const findUser: IUser = await User.findOne(tokenDecode.id);

                if (findUser) {
                    req.auth = findUser;
                    next();
                } else {
                    next(
                        new HttpException(
                            401,
                            'Wrong authentication token',
                            errors.LOGIN_ERROR.code,
                        ),
                    );
                }
            } else {
                next(
                    new HttpException(
                        404,
                        'Authentication token missing',
                        errors.LOGIN_ERROR.code,
                    ),
                );
            }
        } catch (error) {
            next(
                new HttpException(
                    401,
                    'Wrong authentication token',
                    errors.LOGIN_ERROR.code,
                ),
            );
        }
    }
}
