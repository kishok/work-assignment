import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('providers')
export class Provider {
  @PrimaryColumn('uuid')
  provider_id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  specialty: string;

  @Column()
  npi_number: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;
}
