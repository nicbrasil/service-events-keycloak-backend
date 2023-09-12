import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Roles, Resources, Unprotected } from '@nicbrasil/nickeycloak-nestjs';

import { ClientProxy } from '@nestjs/microservices';
import { AdminEventsService } from './admin_events.service';

@Controller('admin')
@Resources(['service-events-backend'])
@Unprotected()
export class AdminEventsController {
  constructor(
    private readonly adminEventsService: AdminEventsService,
    @Inject('ADMIN-EVENTOS-KEYCLOAK-EMITTER')
    private readonly rabbitClient: ClientProxy,
  ) {}

  @Get()
  @Roles(['events-read'])
  async findAll(): Promise<any[]> {
    const events = await this.adminEventsService.findAll();
    return events.map((event) => {
      return event;
    });
  }

  @Get('details/:id')
  @Roles(['events-read'])
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.adminEventsService.findOne(id);
  }

  @Get('teste')
  async teste(): Promise<any> {
    await this.rabbitClient.emit('admin-eventos-keycloak', {
      id: '069c13d5-c7b4-4695-9887-fb46b7a8c132',
    });

    console.log('escevendo no rabbit');
    return 'Ok';
  }
}
