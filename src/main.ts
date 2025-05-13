import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Use cookie-parser with a hardcoded secret key for this demo
  // In production, you should use an environment variable
  const COOKIE_SECRET = process.env.COOKIE_SECRET || 'your-super-secret-key-for-signing-cookies';
  app.use(cookieParser(COOKIE_SECRET));

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('HTTP-Only Secure Cookie API')
    .setDescription('API for setting and getting HTTP-only secure cookies')
    .setVersion('1.0')
    .addCookieAuth('secretToken', {
      type: 'apiKey',
      in: 'cookie',
      name: 'secretToken'
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT ?? 3001;

  // Enhanced CORS configuration
  app.enableCors({
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  });

  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation is available at: ${await app.getUrl()}/api`);
}
bootstrap();
