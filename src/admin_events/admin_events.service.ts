import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEvent } from './entities/admin_event.entity';
import { error } from 'console';

@Injectable()
export class AdminEventsService {
  constructor(
    @InjectRepository(AdminEvent)
    private readonly adminEventRepository: Repository<AdminEvent>,
  ) {}

  async findAll(): Promise<AdminEvent[]> {
    return await this.adminEventRepository.find({
      select: [
        'id',
        'adminEventTime',
        'realmId',
        'operationType',
        'authRealmId',
        'authClientId',
        'authUserId',
        'ipAddress',
        'resourcePath',
        'error',
        'resourceType',
        'error',
        'resourcePath',
      ],
    });
  }

  async findOne(id: string): Promise<any | null> {
    return await this.adminEventRepository.findOne({ where: { id } });
  }
}
