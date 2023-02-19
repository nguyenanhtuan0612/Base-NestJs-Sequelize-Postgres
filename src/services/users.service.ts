import { LoginDto } from '@/dtos/login.dto';
import { CreateUserDto } from '@/dtos/users.dto';
import { User } from '@/entities/users.entity';
import { IUser } from '@/interfaces/users.interface';
import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
    async create(createUserDto: CreateUserDto) {
        const user = new User();
        user.phone_number = createUserDto.phone_number;
        const salt = await genSalt(10);
        user.password = await hash(createUserDto.password, salt);

        const userData: IUser = await user.save();

        return userData;
    }

    async findUserExits(user): Promise<User | null> {
        return User.findOne({
            where: {
                phone_number: user.phone_number,
            },
        });
    }
}
