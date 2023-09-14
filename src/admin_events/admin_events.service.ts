import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { AdminEvent } from './entities/admin_event.entity';
import { error } from 'console';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class AdminEventsService {
  constructor(
    @InjectRepository(AdminEvent)
    private readonly adminEventRepository: Repository<AdminEvent>,
    @Inject('ADMIN-EVENTOS-KEYCLOAK-EMITTER')
    private readonly rabbitClient: ClientProxy,
  ) {}

  async findAll(where: any = {}): Promise<AdminEvent[]> {
    return await this.adminEventRepository.find({
      ...where,
      order: { adminEventTime: 'ASC' },

    });
  }

  async findOne(id: string): Promise<any | null> {
    return await this.adminEventRepository.findOne({ where: { id } });
  }

  async getAdminEventsLastTime(lastTime: number): Promise<AdminEvent[]> {
    return await this.adminEventRepository.find({
      where: { adminEventTime: MoreThan(lastTime) },
      take: 100,
      order: { adminEventTime: 'ASC' },
    });
  }

  async emitAdminEvent(event: AdminEvent) {
    this.rabbitClient.emit('admin-eventos-keycloak', { id: event.id });
  }
}
