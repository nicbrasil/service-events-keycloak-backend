import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { EventsHandlersController } from './events.handlers.controller';
import NicRabbitmqTransport from 'src/shared/amqp-connect/transports/nic-rabbitmq.transport';
@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    NicRabbitmqTransport.registerModuleAsync('eventos-keycloak'),
  ],
  controllers: [EventsHandlersController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
