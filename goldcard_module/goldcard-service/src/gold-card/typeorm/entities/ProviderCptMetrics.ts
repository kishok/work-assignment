import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('provider_cpt_metrics')
export class ProviderCptMetrics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @Column()
  cpt_code: string;

  @Column()
  metric: string;

  @Column()
  value: string;
}
