import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from "class-validator";

export class CreateAssetDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  plate?: string;

  @IsOptional()
  serial?: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ValidateIf((o) => o.acquisitionDate !== "")
  @IsDateString()
  acquisitionDate?: Date;

  @IsNotEmpty()
  @IsString()
  dependency_id: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(["Bueno", "Regular", "Malo"])
  assessment: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(["Activo", "Inactivo", "Dado de baja"])
  status: string;
}

export class CreateAssetMassiveDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAssetDto)
  assets: CreateAssetDto[];
}
