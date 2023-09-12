import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { KeycloakModule } from 'src/keycloak/keycloak.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { EventsHandlersController } from './events.handlers.controller';
import NicRabbitmqTransport from 'src/shared/amqp-connect/transports/nic-rabbitmq.transport';
@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    KeycloakModule,
    NicRabbitmqTransport.registerModuleAsync('eventos-keycloak'),
  ],
  controllers: [EventsController, EventsHandlersController],
  providers: [EventsService],
})
export class EventsModule {}
