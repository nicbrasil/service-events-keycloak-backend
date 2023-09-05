import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeycloakModule } from 'src/keycloak/keycloak.module';
import { AdminEvent } from './entities/admin_event.entity';
import { AdminEventsController } from './admin_events.controller';
import { AdminEventsService } from './admin_events.service';
@Module({
  imports: [TypeOrmModule.forFeature([AdminEvent]), KeycloakModule],
  controllers: [AdminEventsController],
  providers: [AdminEventsService],
})
export class AdminEventsModule {}
