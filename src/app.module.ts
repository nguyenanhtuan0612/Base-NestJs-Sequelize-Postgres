import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { appConfigs, authConfigs } from '@/config';
import { PostgreSqlModule } from '@databases';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { QueryMiddleware } from './middlewares/query.middleware';
import { UsersModule } from './modules/users/users.module';
const ENV = process.env.NODE_ENV;
console.log(ENV);

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfigs, authConfigs],
            envFilePath: !ENV ? '.env' : `.env.${ENV}`,
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async () => ({
                secret: authConfigs().jwtSecretKey,
            }),
            inject: [ConfigService],
        }),
        PostgreSqlModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [JwtStrategy, AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('*');
        consumer
            .apply(QueryMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.GET });
    }
    constructor() {
        //console.log(appConfigs());
    }
}
