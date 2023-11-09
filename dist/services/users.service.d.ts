import { CreateUserDto } from '@/dtos/users.dto';
import { User } from '@/entities/users.entity';
import { IUser } from '@/interfaces/users.interface';
export declare class UsersService {
    create(createUserDto: CreateUserDto): Promise<IUser>;
    findByEmail(email: string): Promise<User | null>;
}
