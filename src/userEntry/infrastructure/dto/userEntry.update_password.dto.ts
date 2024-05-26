import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserEntryPasswordDto {
  @IsNotEmpty()
  last_password: string;

  @IsNotEmpty()
  password?: string;
}
