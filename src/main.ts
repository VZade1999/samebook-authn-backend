import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConstantsService } from './Utils/constants.service';
import helmet from 'helmet';
import  cors from 'cors';
import { Logger } from '@nestjs/common';
import  cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 3030;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: process.env.CLIENT_DOMAIN,
      allowedHeaders: ConstantsService.CORS.ALLOWED_HEADERS,
      exposedHeaders: ConstantsService.CORS.EXPOSED_HEADERS,
      methods: ConstantsService.CORS.METHODS,
      credentials: true,
    }),
  );

  app.use(cookieParser());

  app.use(
    helmet({
      strictTransportSecurity: {
        includeSubDomains: false,
        maxAge: 31536000,
      },
    }),
  );

  Logger.log(`[API Prefix] - ${process.env.API_PREFIX}`);

  if (process.env.API_PREFIX) {
    app.setGlobalPrefix(process.env.API_PREFIX);
  }

  await app.listen(PORT);
}

bootstrap();