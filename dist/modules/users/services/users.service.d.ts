import { ChangeRoleDto, CreateUserDto, UpdateUserDto, UserResponse } from '@/dtos/users.dto';
import { Options } from '@/interfaces/request.interface';
import { IUser } from '@/interfaces/users.interface';
import { User } from '../entities/users.entity';
export declare class UsersService {
    create(createUserDto: CreateUserDto): Promise<IUser>;
    detail(id: string): Promise<UserResponse>;
    banUser(id: string): Promise<UserResponse>;
    unBanUser(id: string): Promise<UserResponse>;
    update(id: string, dto: UpdateUserDto): Promise<UserResponse>;
    list(options: Options): Promise<{
        rows: User[];
        count: number;
    }>;
    changeRole(id: string, dto: ChangeRoleDto): Promise<UserResponse>;
}
