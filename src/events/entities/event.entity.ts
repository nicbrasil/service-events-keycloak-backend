import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'event_entity' })
export class Event {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'client_id' })
  clientId: string;

  @Column({ name: 'details_json' })
  details: string;

  @Column({ name: 'error' })
  error: string;

  @Column({ name: 'ip_address' })
  ipAddress: string;

  @Column({ name: 'realm_id' })
  realmId: string;

  @Column({ name: 'session_id' })
  sessionId: string;

  @Column({ name: 'event_time' })
  eventTime: string;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'user_id' })
  userId: string;
}
