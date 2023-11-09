import { IUser } from '@interfaces/users.interface';
import { Request } from 'express';
<<<<<<< HEAD
import { Options } from './request.interface';
=======
>>>>>>> ff081c85d4996de509b336288884f5eb6ec7f8a8

export interface DataStoredInToken {
    id: number;
}

export interface TokenData {
    token: string;
    expiresIn: number;
}

export interface RequestWithUser extends Request {
    auth: IUser;
}
<<<<<<< HEAD

export interface RequestWithUserOption extends Request {
    auth: IUser;
    options: Options;
}

export interface JwtInfo {
    accessToken: string;
    refreshToken: string;
    tokenExpiresIn: string;
    refreshTokenExpiresIn: string;
}
=======
>>>>>>> ff081c85d4996de509b336288884f5eb6ec7f8a8
