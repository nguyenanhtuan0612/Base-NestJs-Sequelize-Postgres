"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../utils/util");
exports.default = () => ({
    port: parseInt(process.env.PORT) || 5000,
    postgres: {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        logging: (0, util_1.parseBool)(process.env.DB_LOGGING),
        synchronize: (0, util_1.parseBool)(process.env.DB_SYNC),
        autoLoadModels: (0, util_1.parseBool)(process.env.DB_AUTO_LOAD),
    },
    limitFileSize: process.env.LIMIT_FILE_SIZE,
});
//# sourceMappingURL=app.configs.js.map