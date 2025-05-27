import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';
import { red } from 'colorette';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './filter-exceptions';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('KOC Hub Api')
    .setDescription('NestJS API for KOC Hub')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
}

const GLOBAL_PREFIX = 'api/v1';

const PORT = process.env.PORT || 3000;

const CORS_ORIGINS = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : ['http://localhost:5173'];


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  app.setGlobalPrefix(GLOBAL_PREFIX);

  setupSwagger(app);

  app.use(cookieParser());
  
  app.enableCors({
    credentials: true,
    origin: CORS_ORIGINS,
  });

  await app.listen(PORT);

  Logger.log(
    `🚀 Application is running on: ${red(
      `http://localhost:${PORT}/${GLOBAL_PREFIX}`,
    )}`,
  );
  Logger.log(
    `🚀 Application Swagger is running on: ${red(
      `http://localhost:${PORT}/swagger`,
    )}`,
  );
}

void bootstrap();
