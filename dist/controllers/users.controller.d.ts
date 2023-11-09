import { CreateUserDto } from '@dtos/users.dto';
import { UsersService } from '@/services/users.service';
declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, res: any): Promise<any>;
}
export default UsersController;
