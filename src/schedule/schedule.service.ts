import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEventsService } from 'src/admin_events/admin_events.service';
import { Event } from 'src/events/entities/event.entity';
import { EventsService } from 'src/events/events.service';
import { KeycloakLastEventTime } from 'src/shared/entities/keycloak_last_event_time.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class ScheduleService implements OnModuleInit {
  constructor(
    @InjectRepository(KeycloakLastEventTime)
    private readonly keyLastEvRepository: Repository<KeycloakLastEventTime>,
    private readonly eventsService: EventsService,
    private readonly adminEventsService: AdminEventsService,
  ) {}

  async onModuleInit() {
    this.getEvents().then((events) => {
      console.log('events', events.length);
      events.forEach((event) => {
        this.eventsService.emitEvent(event);
        this.saveLastEventTime('client', event.eventTime);
      });
    });

    this.getAdminEvents().then((events) => {
      console.log('admin events', events.length);
      events.forEach((event) => {
        this.saveLastEventTime('admin', event.adminEventTime);
      });
    });
  }

  async getEvents() {
    return await this.eventsService.getEventsLastTime(
      await this.getLastEventTime('client'),
    );
  }

  async getAdminEvents() {
    return await this.adminEventsService.getAdminEventsLastTime(
      await this.getLastEventTime('admin'),
    );
  }

  async getLastEventTime(origem: string) {
    const event = await this.keyLastEvRepository.findOne({
      where: { id: origem },
    });
    if (!event) return await this.saveLastEventTime(origem, 0);
    return event.lastEventTime;
  }

  async saveLastEventTime(origem: string, lastEventTime: number) {
    const event = await this.keyLastEvRepository.save({
      id: origem,
      lastEventTime,
    });
    return event.lastEventTime;
  }
}
