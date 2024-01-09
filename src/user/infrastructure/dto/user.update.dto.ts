import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, ValidateIf } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @ValidateIf((o) => o.cellphone !== "")
  @IsString({ message: 'El número de celular debe ser una cadena de texto' })
  @Matches(/^(|\+57)?[0-9]{10,}$/, { message: 'El formato del número de celular no es válido. Debe ser +5X XXXXXXXXXX' })
  cellphone?: string;

  @IsNotEmpty()
  @IsOptional()
  active?: boolean;
}
