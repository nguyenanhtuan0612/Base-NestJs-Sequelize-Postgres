import { RegisterDto } from '@/dtos/users.dto';
import { UsersService } from './users.service';
import { User } from '@/entities/users.entity';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UsersService);
    register(registerDto: RegisterDto): Promise<User>;
}
