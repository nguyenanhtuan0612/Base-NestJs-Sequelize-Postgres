import { LoginDto, LoginWithOTPDto } from '@/dtos/login.dto';
import { CreateUserDto, RegisterDto } from '@/dtos/users.dto';
import { User } from '@/entities/users.entity';
import { Options } from '@/interfaces/request.interface';
import { IUser } from '@/interfaces/users.interface';
import sequelizePaginationMiddleware from '@/middlewares/response.middleware';
import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UserService {
    async create(createUserDto: CreateUserDto) {
        const user = new User();
        user.phoneNumber = createUserDto.phoneNumber;
        const salt = await genSalt(10);
        user.password = await hash(createUserDto.password, salt);
        const userData: IUser = await user.save();
        return userData;
    }

    async findAll(options: Options, req: any, res: any) {
        try {
            const hiddenFields = ['password'];
            const include = null;
            await sequelizePaginationMiddleware(
                User,
                options,
                hiddenFields,
                include,
            )(req, res, () => {});
        } catch (error) {
            throw error;
        }
    }

    async findUserExits(
        user: RegisterDto | LoginDto | LoginWithOTPDto,
    ): Promise<User | null> {
        return User.findOne({
            where: {
                phoneNumber: user.phoneNumber,
            },
        });
    }
}
