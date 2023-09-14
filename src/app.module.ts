import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { EventsModule } from './events/events.module';
import { AdminEventsModule } from './admin_events/admin_events.module';
import { KeycloakLastEventTime } from './shared/entities/keycloak_last_event_time.entity';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DEFAULT_DB_HOST'),
          port: parseInt(configService.get('DEFAULT_DB_PORT')),
          database: configService.get('DEFAULT_DB_DATABASE'),
          username: configService.get('DEFAULT_DB_USERNAME'),
          password: configService.get('DEFAULT_DB_PASSWORD'),
          entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
          synchronize: false, // Importante, se não perde os dados no oficial
          extra: {
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
          },
        };
      },
      inject: [ConfigService],
    }),
    EventsModule,
    AdminEventsModule,
    ScheduleModule,
  ],
})
export class AppModule {}
