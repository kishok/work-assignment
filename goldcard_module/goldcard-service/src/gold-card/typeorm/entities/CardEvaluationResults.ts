import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('gold_carding_evaluation_results')
export class GoldCardingEvaluationResults {
  @PrimaryGeneratedColumn('uuid')
  evaluation_id: string;

  @Column()
  provider_id: string;

  @Column()
  criteria_id:string;

  @Column({ type: 'timestamp' })
  evaluation_date: Date;

  @Column({ default: false })
  meets_criteria: boolean;

  @Column({ nullable: true })
  actual_value: string;
}
