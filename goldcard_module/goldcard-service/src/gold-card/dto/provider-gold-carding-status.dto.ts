import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class ProviderGoldCardingStatusDto {

    @IsOptional()
    @IsUUID()
    @IsNotEmpty()
    status_id?: string;
  
    @IsUUID()
    @IsNotEmpty()
    provider_id: string;
  
    @IsNotEmpty()
    @IsBoolean()
    criteria_met: boolean;
  
    @IsNotEmpty()
    @IsString()
    gold_carding_level: string;
  
    @IsNotEmpty()
    valid_from: string;
  
    @IsNotEmpty()
    valid_until: string;
  }