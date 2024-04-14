import { IsUUID, IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';


export class GoldCardingCriteriaDto {
    @IsUUID()
    @IsNotEmpty()
    criteria_id: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsString()
    metric: string;
  
    @IsNotEmpty()
    @IsString()
    threshold: string;
  
    @IsNotEmpty()
    @IsString()
    operator: string;
  
    @IsNotEmpty()
    @IsNumber()
    measurement_period_months: number;

    @IsNotEmpty()
    @IsString()
    cpt_code: string;
  
    @IsUUID()
    @IsNotEmpty()
    payer_id: string;
  }