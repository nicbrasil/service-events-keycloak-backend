import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Roles, Resources, Unprotected } from '@nicbrasil/nickeycloak-nestjs';

import { EventsService } from './events.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('events')
@Resources(['service-events-backend'])
@Unprotected()
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    @Inject('EVENTOS-KEYCLOAK-EMITTER') private readonly rabbitClient: ClientProxy,
  ) {}

  @Get()
  @Roles(['events-read'])
  async findAll(): Promise<any[]> {
    const events = await this.eventsService.findAll();
    return events.map((event) => {
      return event;
    });
  }

  @Get('details/:id')
  @Roles(['events-read'])
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.eventsService.findOne(id);
  }

  @Get('teste')
  async teste(): Promise<any> {
    await this.rabbitClient.emit('eventos-keycloak', {
      id: '72992053-648a-4c8b-b965-b47698ffcd4c',
    });

    console.log('escevendo no rabbit');
    return 'Ok';
  }
}
