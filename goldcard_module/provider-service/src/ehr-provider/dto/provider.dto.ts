import { IsUUID, IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';


export class ProviderDto {
    @IsUUID()
    @IsNotEmpty()
    provider_id: string;
  
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    specialty: string;
  
    @IsOptional()
    @IsString()
    npi_number: string;
  
    @IsOptional()
    @IsEmail()
    email: string;
  
    @IsOptional()
    @IsString()
    phone_number: string;
  }