import {
  IsDateString,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateIf,
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
  dependency_id: string;

  @IsNotEmpty()
  assessment: string;

  @IsNotEmpty()
  status: string;
}
