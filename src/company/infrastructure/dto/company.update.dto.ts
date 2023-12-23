import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  nit?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  cellphone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  type?: string;

  @IsOptional()
  webpage?: string;

  @IsNotEmpty()
  @IsOptional()
  active?: boolean;
}
