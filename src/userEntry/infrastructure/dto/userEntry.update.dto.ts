import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, ValidateIf } from "class-validator";

export class UpdateUserEntryDto {
  @IsOptional()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsOptional()
  active?: boolean;
}
