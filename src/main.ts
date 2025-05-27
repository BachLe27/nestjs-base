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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());

  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  setupSwagger(app);

  const port = process.env.PORT || 3000;

  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:5173'],
  });

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: ${red(
      `http://localhost:${port}/${globalPrefix}`,
    )}`,
  );
  Logger.log(
    `🚀 Application Swagger is running on: ${red(
      `http://localhost:${port}/swagger`,
    )}`,
  );
}

void bootstrap();
