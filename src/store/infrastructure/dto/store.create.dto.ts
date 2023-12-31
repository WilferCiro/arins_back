import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateStoreDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  code: string;

  @IsNotEmpty()
  active: boolean;
}
