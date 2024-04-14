import { IsUUID, IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';


export class PayerGoldCardingEligibilityDto {
    @IsOptional()
    @IsUUID()
    @IsNotEmpty()
    eligibility_id?: string;
  
    @IsUUID()
    @IsNotEmpty()
    payer_id: string;
  
    @IsUUID()
    @IsNotEmpty()
    provider_id: string;
  
    @IsNotEmpty()
    @IsString()
    cpt_code: string;
  
    @IsNotEmpty()
    @IsBoolean()
    is_eligible: boolean;
  
    @IsOptional()
    @IsString()
    reason?: string;
  }