import { IsUUID, IsNotEmpty, IsString, IsOptional } from 'class-validator';


export class PayerDto {
    @IsOptional()
    @IsUUID()
    @IsNotEmpty()
    id: string;
  
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  }