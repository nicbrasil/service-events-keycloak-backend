import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Roles, Resources, Unprotected } from '@nicbrasil/nickeycloak-nestjs';

import {
  ClientProxy,
  MessagePattern,
  RmqContext,
  Transport,
} from '@nestjs/microservices';
import { AdminEvent } from './entities/admin_event.entity';
import { AdminEventsService } from './admin_events.service';

@Controller('events')
export class AdminEventsHandlersController {
  constructor(
    private readonly adminEventsService: AdminEventsService,
    @Inject('ADMIN-EVENTOS-KEYCLOAK-EMITTER')
    private readonly amqpClient: ClientProxy,
  ) {}

  @MessagePattern('admin-eventos-keycloak', Transport.RMQ)
  async separteEventsByResource(data: any) {
    const event: AdminEvent = await this.adminEventsService.findOne(data.id);
    if (!event) return 'ok';

    console.log(
      `Evento recebido: ${event.id} - ${event.operationType} - ${event.resourceType}`,
    );
    if (event.resourceType == 'USER') {
      console.log('Evento de usuário');

      const user: UserEvent = {
        origem: 'keycloak-admin',
        action: event.operationType,
        keycloakId: event.resourcePath.split('/')[1],
        realm: event.realmId == 'devsysnic' ? 'devsysnic' : 'master',
        time: event.adminEventTime,
      };
      await this.amqpClient.emit('eventos-users', user);
    }

    return 'ok';
  }
}
