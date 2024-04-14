import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Provider } from './Provider';
import { CptCode } from './CptCodes';

@Entity('provider_cpt_approval')
export class ProviderCptApproval {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider_id: Provider;

  @ManyToOne(() => CptCode)
  @JoinColumn({ name: 'cpt_code' })
  cpt_code: CptCode;

  @Column({ default: false })
  readmission: boolean;

  @Column({ default: false })
  treatment_guideline_adherence: boolean;

  @Column({ default: 0 })
  patient_satisfaction: number;

  @Column({ default: 0 })
  recovery_rate: number;

  @Column({ default: 0 })
  cost_efficiency: number;

  @Column({ nullable: true })
  submission_date: Date;

  @Column({ nullable: true })
  approval_status: boolean;

  @Column({ nullable: true })
  denial_reason: string;

  @Column('uuid')
  payer_id: string;
}
