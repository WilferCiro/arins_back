import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { Types } from "mongoose";

export class CreateDependencyDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  code: string;

  @IsNotEmpty()
  active: boolean;
}
