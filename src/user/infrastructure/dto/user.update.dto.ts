import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

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
  cellphone?: string;

  @IsNotEmpty()
  @IsOptional()
  active?: boolean;
}
