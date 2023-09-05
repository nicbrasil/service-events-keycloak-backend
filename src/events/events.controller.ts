import { Controller, Get, Param } from '@nestjs/common';
import { Roles, Resources, Unprotected } from '@nicbrasil/nickeycloak-nestjs';

import { EventsService } from './events.service';

@Controller('events')
@Resources(['service-events-backend'])
@Unprotected()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @Roles(['events-read'])
  async findAll(): Promise<any[]> {
    const events = await this.eventsService.findAll();
    return events.map((event) => {
      return event;
    });
  }

  @Get(':id')
  @Roles(['events-read'])
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.eventsService.findOne(id);
  }
}
