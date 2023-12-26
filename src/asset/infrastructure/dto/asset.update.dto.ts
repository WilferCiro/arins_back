import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";

export class UpdateAssetDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  plate?: string;

  @IsOptional()
  serial?: string;

  @IsOptional()
  @IsNotEmpty()
  category?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  price?: number;

  @IsDateString()
  @IsOptional()
  acquisitionDate?: Date;

  @IsOptional()
  @IsNotEmpty()
  dependency_id?: string;

  @IsOptional()
  @IsNotEmpty()
  assessment?: string;

  @IsOptional()
  @IsNotEmpty()
  status?: string;
}
