import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfigs, authConfigs } from '@/config';
import { PostgreSqlModule } from '@databases';
import { JwtModule } from '@nestjs/jwt';
const ENV = process.env.NODE_ENV;
console.log(ENV);

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfigs, authConfigs],
            envFilePath: !ENV ? '.env.development' : `.env.${ENV}`,
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: authConfigs().jwtSecretKey,
            }),
            inject: [ConfigService],
        }),
        PostgreSqlModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor() {
        console.log(appConfigs());
    }
}
