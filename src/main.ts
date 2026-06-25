import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConstantsService } from './Utils/constants.service';
import helmet from 'helmet';
import cors from 'cors';
import { Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 3030;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });

  // ✅ 1. Helmet FIRST — sets security headers including X-Content-Type-Options
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' }, // ✅ required for Vercel cross-origin requests
      strictTransportSecurity: {
        includeSubDomains: false,
        maxAge: 31536000,
      },
    }),
  );

  // ✅ 2. CORS AFTER helmet
  app.use(
    cors({
      origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://samebook-frontend-dev.vercel.app',           // ✅ production (no trailing slash)
        'https://samebook-frontend-dev-git-main-vzade1999s-projects.vercel.app', // ✅ no trailing slash
        'https://samebook-frontend-7509vwpkg-vzade1999s-projects.vercel.app',
      ],
      allowedHeaders: ConstantsService.CORS.ALLOWED_HEADERS,
      exposedHeaders: ConstantsService.CORS.EXPOSED_HEADERS,
      methods: ConstantsService.CORS.METHODS,
      credentials: true,
    }),
  );

  // ✅ 3. Cookie parser after CORS
  app.use(cookieParser());

  Logger.log(`[API Prefix] - ${process.env.API_PREFIX}`);

  if (process.env.API_PREFIX) {
    app.setGlobalPrefix(process.env.API_PREFIX);
  }

  await app.listen(PORT);
}

bootstrap();