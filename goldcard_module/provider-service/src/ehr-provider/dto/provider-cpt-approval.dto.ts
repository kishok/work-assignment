import { IsBoolean, IsOptional, IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class ProviderCptApprovalDto {

  @IsOptional()
  @IsUUID()
  id: string;

  @IsUUID()
  provider_id: string;

  @IsString()
  cpt_code: string;

  @IsBoolean()
  @IsOptional()
  readmission?: boolean;

  @IsBoolean()
  @IsOptional()
  treatment_guideline_adherence?: boolean;

  @IsOptional()
  patient_satisfaction: number;

  @IsOptional()
  recovery_rate: number;

  @IsOptional()
  cost_efficiency: number;
  
  @IsString()
  submission_date: string;

  @IsBoolean()
  @IsOptional()
  approval_status: boolean;

  @IsString()
  @IsOptional()
  denial_reason?: string;

  @IsUUID()
  @IsNotEmpty()
  payer_id: string;
}
