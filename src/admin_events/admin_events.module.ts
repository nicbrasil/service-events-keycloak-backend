import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeycloakModule } from 'src/keycloak/keycloak.module';
import { AdminEvent } from './entities/admin_event.entity';
import { AdminEventsService } from './admin_events.service';
import NicRabbitmqTransport from 'src/shared/amqp-connect/transports/nic-rabbitmq.transport';
import { AdminEventsController } from './admin_events.controller';
import { AdminEventsHandlersController } from './admin_events.handlers.controller copy';
@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEvent]),
    KeycloakModule,
    NicRabbitmqTransport.registerModuleAsync('admin-eventos-keycloak'),
  ],
  controllers: [AdminEventsController, AdminEventsHandlersController],
  providers: [AdminEventsService],
})
export class AdminEventsModule {}
