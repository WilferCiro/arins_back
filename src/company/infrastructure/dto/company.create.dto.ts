import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, ValidateIf } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty({ message: 'El NIT no puede estar vacío' })
  @IsString({ message: 'El NIT debe ser una cadena de texto' })
  @Matches(/^\d{9}-\d$/, { message: 'El formato del NIT no es válido. Debe ser XXXXXXXXX-Y' })
  nit: string;

  @IsOptional()
  address: string;

  @IsOptional()
  @ValidateIf((o) => o.cellphone !== "")
  @IsString({ message: 'El número de celular debe ser una cadena de texto' })
  @Matches(/^(|\+57)?[0-9]{10,}$/, { message: 'El formato del número de celular no es válido. Debe ser +5X XXXXXXXXXX' })
  cellphone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  webpage: string;

  @IsNotEmpty()
  type: string;
}
