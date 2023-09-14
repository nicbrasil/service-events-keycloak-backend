import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeycloakLastEventTime } from 'src/shared/entities/keycloak_last_event_time.entity';
import { ScheduleService } from './schedule.service';
import { EventsService } from 'src/events/events.service';
import { EventsModule } from 'src/events/events.module';
import { AdminEventsModule } from 'src/admin_events/admin_events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([KeycloakLastEventTime]),
    EventsModule,
    AdminEventsModule,
  ],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
