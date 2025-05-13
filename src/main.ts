import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Use cookie-parser with a hardcoded secret key for this demo
  // In production, you should use an environment variable
  const COOKIE_SECRET = process.env.COOKIE_SECRET || 'your-super-secret-key-for-signing-cookies';
  app.use(cookieParser(COOKIE_SECRET));

  // Enhanced CORS configuration
  app.enableCors({
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
