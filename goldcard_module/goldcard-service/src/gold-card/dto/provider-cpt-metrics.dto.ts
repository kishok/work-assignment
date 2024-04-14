import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class ProviderCptMetricsDto {
  @IsUUID()
  provider_id: string;

  @IsString()
  @IsNotEmpty()
  cpt_code: string;

  @IsString()
  @IsNotEmpty()
  metric: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}
