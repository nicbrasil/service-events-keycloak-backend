import { Controller, Get, Param } from '@nestjs/common';
import { Roles, Resources, Unprotected } from '@nicbrasil/nickeycloak-nestjs';
import { AdminEventsService } from './admin_events.service';

@Controller('admin')
@Resources(['service-events-backend'])
@Unprotected()
export class AdminEventsController {
  constructor(private readonly adminEventsService: AdminEventsService) {}

  @Get()
  @Roles(['events-read'])
  async findAll(): Promise<any[]> {
    const events = await this.adminEventsService.findAll();
    return events.map((event) => {
      return event;
    });
  }

  @Get(':id')
  @Roles(['events-read'])
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.adminEventsService.findOne(id);
  }
}
