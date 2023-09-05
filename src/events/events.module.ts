import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { KeycloakModule } from 'src/keycloak/keycloak.module';
@Module({
  imports: [TypeOrmModule.forFeature([Event]), KeycloakModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}