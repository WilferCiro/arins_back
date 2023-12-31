import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  description: string;

  @IsOptional()
  barcode: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNotEmpty()
  presentation: string;
}
