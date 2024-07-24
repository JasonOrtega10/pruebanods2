"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.use(bodyParser.raw({ type: "application/octet-stream", limit: "20mb" }));
    app.use(cookieParser());
    app.set("trust proxy", true);
    await fs.promises.mkdir("./data/uploads/_temp", { recursive: true });
    app.setGlobalPrefix("api");
    if (process.env.NODE_ENV == "development") {
        const config = new swagger_1.DocumentBuilder()
            .setTitle("Pingvin Share API")
            .setVersion("1.0")
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup("api/swagger", app, document);
    }
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map