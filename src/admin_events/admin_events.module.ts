import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEvent } from './entities/admin_event.entity';
import { AdminEventsService } from './admin_events.service';
import NicRabbitmqTransport from 'src/shared/amqp-connect/transports/nic-rabbitmq.transport';
import { AdminEventsHandlersController } from './admin_events.handlers.controller copy';
@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEvent]),
    NicRabbitmqTransport.registerModuleAsync('admin-eventos-keycloak'),
  ],
  controllers: [AdminEventsHandlersController],
  providers: [AdminEventsService],
  exports: [AdminEventsService],
})
export class AdminEventsModule {}
