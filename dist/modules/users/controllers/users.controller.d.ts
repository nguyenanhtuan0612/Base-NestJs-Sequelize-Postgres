import { RequestWithUserOption } from '@/interfaces/auth.interface';
import { Response } from 'express';
import { UsersService } from '../services/users.service';
import { ChangeRoleDto, CreateUserDto } from '@/dtos/users.dto';
declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, res: any): Promise<any>;
    list(req: RequestWithUserOption, res: any): Promise<any>;
    ban(id: string, res: any): Promise<any>;
    unBan(id: string, res: any): Promise<any>;
    changeRole(id: string, res: Response, dto: ChangeRoleDto): Promise<Response<any, Record<string, any>>>;
    detail(id: string, res: any, req: RequestWithUserOption): Promise<any>;
}
export default UsersController;
