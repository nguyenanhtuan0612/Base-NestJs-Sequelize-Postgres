import { Dialect } from 'sequelize/types';
declare const _default: () => {
    port: number;
    postgres: {
        dialect: Dialect;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        logging: boolean;
        synchronize: boolean;
        autoLoadModels: boolean;
    };
    limitFileSize: string;
};
export default _default;
