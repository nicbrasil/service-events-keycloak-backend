import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ValidationErrorFilter } from './filters/validation-error.mongo.filter';
import { Transport } from '@nestjs/microservices';
import { RabbitmqServerFactory } from './shared/amqp-connect/server-factories/rabbitmq.server-factory';
import NicRabbitmqTransport from './shared/amqp-connect/transports/nic-rabbitmq.transport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe()); // Habilita a validação de dados (DTO)
  app.useGlobalFilters(new ValidationErrorFilter());

  const rabbitMqServices = ['eventos-keycloak', 'admin-eventos-keycloak'];
  for (let index = 0; index < rabbitMqServices.length; index++) {
    const service = rabbitMqServices[index];
    await app.connectMicroservice({
      strategy: new RabbitmqServerFactory(
        NicRabbitmqTransport.getOptionsModuleRmq(service),
      ),
      options: NicRabbitmqTransport.getOptionsModuleRmq(service),
    });
  }

  await app.startAllMicroservices();

  const port = configService.get('PORT') || 3000;
  await app.listen(port);
}

bootstrap();
