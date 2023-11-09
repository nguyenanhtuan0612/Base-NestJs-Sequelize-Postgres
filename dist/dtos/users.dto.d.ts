import { JwtInfo } from '@/interfaces/auth.interface';
import { User } from '@/modules/users/entities/users.entity';
export declare class RegisterDto {
    email: string;
    password: string;
}
export declare class CreateUserDto {
    email: string;
    password: string;
    role: string;
}
export declare class UpdateUserDto {
    email: string;
    password: string;
    role: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}
export declare class ChangeRoleDto {
    role: string;
}
export declare class AddMoneyToBalanceDto {
    money: number;
}
export declare class UserResponse {
    id: string;
    email: string;
    balance: number;
    role: string;
    active: boolean;
    constructor(iUser: User);
}
export declare class UserResponeWithToken extends UserResponse {
    jwt: JwtInfo;
    constructor(iUser: User, jwt: JwtInfo);
}
