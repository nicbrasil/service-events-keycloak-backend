import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ValidationErrorFilter } from './filters/validation-error.mongo.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe()); // Habilita a validação de dados (DTO)
  app.useGlobalFilters(new ValidationErrorFilter());

  const port = configService.get('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
