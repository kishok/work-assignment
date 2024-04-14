import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('payer')
export class Payer {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;
}
