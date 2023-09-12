import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Roles, Resources, Unprotected } from '@nicbrasil/nickeycloak-nestjs';

import { EventsService } from './events.service';
import {
  ClientProxy,
  MessagePattern,
  RmqContext,
  Transport,
} from '@nestjs/microservices';
import { Event } from './entities/event.entity';

@Controller('events')
export class EventsHandlersController {
  constructor(
    private readonly eventsService: EventsService,
    @Inject('EVENTOS-KEYCLOAK-EMITTER')
    private readonly amqpClient: ClientProxy,
  ) {}

  @MessagePattern('eventos-keycloak', Transport.RMQ)
  async separteEventsByResource(data: any) {
    const event: Event = await this.eventsService.findOne(data.id);
    if (event && event.type == 'UPDATE_PROFILE') {
      const user: UserEvent = {
        origem: 'keycloak-client',
        action: 'UPDATE',
        keycloakId: event.userId,
        realm: event.realmId == 'devsysnic' ? 'devsysnic' : 'master',
        time: event.eventTime,
      };

      await this.amqpClient.emit('eventos-users', user);
    }
    return 'ok';
  }
}
