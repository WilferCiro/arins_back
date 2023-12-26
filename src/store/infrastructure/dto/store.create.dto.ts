import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";
import { Types } from "mongoose";

export class CreateStoreDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  code: string;

  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  company_id: string;

  @IsNotEmpty()
  active: boolean;
}
