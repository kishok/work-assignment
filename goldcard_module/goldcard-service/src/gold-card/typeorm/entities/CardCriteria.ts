import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('gold_carding_criteria')
export class GoldCardingCriteria {
  @PrimaryColumn('uuid')
  criteria_id: string;

  @Column()
  description: string;

  @Column()
  metric: string;

  @Column()
  threshold: string;

  @Column()
  operator: string;

  @Column()
  measurement_period_months: number;

  @Column({ length: 10 })
  cpt_code: string;

  @Column('uuid')
  payer_id: string;
}
