import { Injectable, OnModuleInit } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEventsService } from 'src/admin_events/admin_events.service';
import { EventsService } from 'src/events/events.service';
import { KeycloakLastEventTime } from 'src/shared/entities/keycloak_last_event_time.entity';
import {  Repository } from 'typeorm';

@Injectable()
export class ScheduleService implements OnModuleInit {
  constructor(
    @InjectRepository(KeycloakLastEventTime)
    private readonly keyLastEvRepository: Repository<KeycloakLastEventTime>,
    private readonly eventsService: EventsService,
    private readonly adminEventsService: AdminEventsService,
  ) {}

  onModuleInit() {
    console.log(new Date(), 'Iniciando projeto');
    this.readAllEvents();
  }

  async readAllEvents() {
    // console.log(new Date(), 'Iniciando leitura dos eventos');

    await this.getEvents().then(async (events) => {
      // console.log(
      //   new Date(),
      //   'Iniciando leitura dos eventos do client: ',
      //   events.length,
      // );
      for (const event of events) {
        this.eventsService.emitEvent(event);
        await this.saveLastEventTime('client', event.eventTime);
      }
      // console.log(new Date(), 'Quantidade de eventos lidos', events.length);
    });

    this.getAdminEvents().then(async (events) => {
      // console.log(
      //   new Date(),
      //   'Iniciando leitura dos eventos ADMIN: ',
      //   events.length,
      // );
      for (const event of events) {
        this.adminEventsService.emitAdminEvent(event);
        await this.saveLastEventTime('admin', event.adminEventTime);
      }
      // console.log(
      //   new Date(),
      //   'Quantidade de eventos ADMIN lidos',
      //   events.length,
      // );
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

  async getLastEventTime(origem: string): Promise<number> {
    const event = await this.keyLastEvRepository.findOne({
      where: { id: origem },
    });
    if (!event) return 0;
    // if (!event) return await this.saveLastEventTime(origem, Date.now());
    return event.lastEventTime;
  }

  async saveLastEventTime(
    origem: string,
    lastEventTime: number,
  ): Promise<number> {
    const aux = await this.getLastEventTime(origem);
    if (aux > lastEventTime) {
      return aux;
    }
    await this.keyLastEvRepository.save({
      id: origem,
      lastEventTime,
    });

    return lastEventTime;
  }

  @Interval(5000) // Executa a cada 5 segundos
  async refreshEvents() {
    // console.log(new Date(), 'Iniciando refreshEvents');
    this.readAllEvents();
  }
}
