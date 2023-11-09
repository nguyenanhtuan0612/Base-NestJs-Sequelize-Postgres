"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_2 = require("./config");
const exception_1 = require("./exceptions/exception");
const swagger_1 = require("./swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.get(config_1.ConfigService);
    app.setGlobalPrefix('api');
    (0, swagger_1.setupSwagger)(app);
    app.useGlobalPipes(new common_1.ValidationPipe({}));
    app.useGlobalFilters(new exception_1.AllExceptionFilter());
    await app.listen((0, config_2.appConfigs)().port || 80);
}
bootstrap();
//# sourceMappingURL=main.js.map