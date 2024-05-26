import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserEntryDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  active?: boolean;
}
