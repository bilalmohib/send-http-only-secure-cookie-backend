import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Use cookie-parser to parse cookies from requests
  app.use(cookieParser());

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('HTTP-Only Secure Cookie API')
    .setDescription('API for retrieving HTTP-only secure cookies sent from the frontend')
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

  // Enhanced CORS configuration to allow cookies from frontend
  app.enableCors({
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
    credentials: true, // Critical for cookies to work cross-domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Cookie'],
  });

  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation is available at: ${await app.getUrl()}/api`);
}
bootstrap();
