import { IsBoolean, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class GoldCardingEvaluationResultsDto {
    @IsUUID()
    @IsNotEmpty()
    evaluation_id: string;
  
    @IsUUID()
    @IsNotEmpty()
    provider_id: string;
  
    @IsUUID()
    @IsNotEmpty()
    criteria_id: string;
  
    @IsNotEmpty()
    evaluation_date: Date;
  
    @IsNotEmpty()
    @IsBoolean()
    meets_criteria: boolean;
  
    @IsNotEmpty()
    @IsString()
    actual_value: string;
  }
  