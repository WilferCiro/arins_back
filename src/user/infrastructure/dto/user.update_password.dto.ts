import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  last_password: string;

  @IsNotEmpty()
  password?: string;
}
