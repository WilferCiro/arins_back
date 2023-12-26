import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateStoreDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  code?: string;

  @IsNotEmpty()
  @IsOptional()
  active?: boolean;
}
