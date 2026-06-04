"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const constants_service_1 = require("./Utils/constants.service");
const helmet_1 = require("helmet");
const cors = require("cors");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3030;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors({
        origin: process.env.CLIENT_DOMAIN,
        allowedHeaders: constants_service_1.ConstantsService.CORS.ALLOWED_HEADERS,
        exposedHeaders: constants_service_1.ConstantsService.CORS.EXPOSED_HEADERS,
        methods: constants_service_1.ConstantsService.CORS.METHODS,
        credentials: true,
    }));
    app.use(cookieParser());
    app.use((0, helmet_1.default)({
        strictTransportSecurity: {
            includeSubDomains: false,
            maxAge: 31536000,
        },
    }));
    common_1.Logger.log(`[API Prefix] - ${process.env.API_PREFIX}`);
    if (process.env.API_PREFIX) {
        app.setGlobalPrefix(process.env.API_PREFIX);
    }
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map