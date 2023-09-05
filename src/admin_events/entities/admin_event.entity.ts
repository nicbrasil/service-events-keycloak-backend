import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'admin_event_entity' })
export class AdminEvent {
  @PrimaryColumn({ name: 'id', type: 'varchar', length: 36 })
  id: string;

  @Column({ name: 'admin_event_time', type: 'bigint' })
  adminEventTime: number;

  @Column({ name: 'realm_id', type: 'varchar', length: 255 })
  realmId: string;

  @Column({ name: 'operation_type', type: 'varchar', length: 255 })
  operationType: string;

  @Column({ name: 'auth_realm_id', type: 'varchar', length: 255 })
  authRealmId: string;

  @Column({ name: 'auth_client_id', type: 'varchar', length: 255 })
  authClientId: string;

  @Column({ name: 'auth_user_id', type: 'varchar', length: 255 })
  authUserId: string;

  @Column({ name: 'ip_address', type: 'varchar', length: 255 })
  ipAddress: string;

  @Column({ name: 'resource_path', type: 'varchar', length: 2550 })
  resourcePath: string;

  @Column({ name: 'representation', type: 'text' })
  representation: string;

  @Column({ name: 'error', type: 'varchar', length: 255 })
  error: string;

  @Column({ name: 'resource_type', type: 'varchar', length: 64 })
  resourceType: string;

}