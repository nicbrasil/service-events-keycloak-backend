import { Column, Entity } from 'typeorm';

@Entity('keycloak_last_event_time', { schema: 'public' })
export class KeycloakLastEventTime {
  @Column('varchar', { primary: true, name: 'id', length: 10 })
  id: string;

  @Column('bigint', { name: 'last_event_time', nullable: false })
  lastEventTime: number;
}
