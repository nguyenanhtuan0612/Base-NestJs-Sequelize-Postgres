import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import UsersController from './controllers/users.controller';
import { User } from './entities/users.entity';
import { UsersService } from './services/users.service';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
