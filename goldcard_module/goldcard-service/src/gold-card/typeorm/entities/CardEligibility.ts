import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('payer_gold_carding_eligibility')
export class PayerGoldCardingEligibility {
  @PrimaryColumn('uuid')
  eligibility_id: string;

  @Column('uuid')
  payer_id: string;

  @Column('uuid')
  provider_id: string;

  @Column({ length: 10 })
  cpt_code: string;

  @Column()
  is_eligible: boolean;

  @Column({ nullable: true })
  reason: string;
}
