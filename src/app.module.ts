import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfigs, authConfigs } from '@/config';
import { PostgreSqlModule } from '@databases';
import { JwtModule } from '@nestjs/jwt';
import controllers from './controllers';
import services from './services';
import { QueryMiddleware } from './middlewares/query.middleware';
import { AuthMiddleware } from './middlewares/auth.middleware';
const ENV = process.env.NODE_ENV;
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfigs, authConfigs],
            envFilePath: !ENV ? '.env.development' : `.env.${ENV}`,
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async () => ({
                secret: authConfigs().jwtSecretKey,
            }),
            inject: [ConfigService],
        }),
        PostgreSqlModule,
    ],
    controllers: [...Object.values(controllers)],
    providers: [...Object.values(services), QueryMiddleware, AuthMiddleware],
})
export class AppModule implements NestModule {
    constructor() {}
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(QueryMiddleware).forRoutes('*');
    }
}
