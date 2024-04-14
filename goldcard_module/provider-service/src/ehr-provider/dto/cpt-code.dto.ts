import { IsUUID, IsNotEmpty, IsString, IsOptional } from 'class-validator';


export class CptCodeDto {

    @IsOptional()
    @IsUUID()
    @IsNotEmpty()
    id: string;
  
    @IsNotEmpty()
    @IsString()
    code: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsOptional()
    @IsString()
    code_type: string;
  }