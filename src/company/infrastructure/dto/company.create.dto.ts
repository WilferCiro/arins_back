import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  nit: string;

  @IsOptional()
  address: string;

  @IsOptional()
  cellphone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  webpage: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  active: boolean;
}
