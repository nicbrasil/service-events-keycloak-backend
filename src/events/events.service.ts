import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { Event } from './entities/event.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @Inject('EVENTOS-KEYCLOAK-EMITTER')
    private readonly rabbitClient: ClientProxy,
  ) {}

  async findAll(where: any = {}): Promise<Event[]> {
    return await this.eventRepository.find({
      ...where,
      order: { eventTime: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Event> {
    return await this.eventRepository.findOne({ where: { id } });
  }

  async getEventsLastTime(lastTime: number): Promise<Event[]> {
    return await this.eventRepository.find({
      where: { eventTime: MoreThan(lastTime) },
      take: 100,
      order: { eventTime: 'ASC' },
    });
  }

  async emitEvent(event: Event) {
    this.rabbitClient.emit('eventos-keycloak', { id: event.id });
  }
}
