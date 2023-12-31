import { IsOptional } from "class-validator";

export class FilterAssetDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  category?: string[];

  @IsOptional()
  acquisitionDate?: Date[];

  @IsOptional()
  dependency_id?: string[];

  @IsOptional()
  assessment?: string[];

  @IsOptional()
  status?: string[];
}
