import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async findAll(): Promise<Event[]> {
    return await this.eventRepository.find({
      // where: { resourceType: 'USER', realmId: 'devsysnic' },
    });
  }

  async findOne(id: string): Promise<any | null> {
    return await this.eventRepository.findOne({ where: { id } });
  }
}
