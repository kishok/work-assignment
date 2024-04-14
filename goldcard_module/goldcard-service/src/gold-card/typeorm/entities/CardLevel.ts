import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('provider_gold_carding_status')
export class ProviderGoldCardingStatus {
  @PrimaryGeneratedColumn('uuid')
  status_id: string;

  @Column()
  provider_id: string;

  @Column({ default: false })
  criteria_met: boolean;

  @Column({ nullable: true })
  gold_carding_level: string;

  @Column({ type: 'timestamp', nullable: true })
  valid_from: Date;

  @Column({ type: 'timestamp', nullable: true })
  valid_until: Date;
}
