import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('cpt_code')
export class CptCode {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 10, unique: true })
  code: string;

  @Column()
  description: string;

  @Column()
  code_type: string;
}
