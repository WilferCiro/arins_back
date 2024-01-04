import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  barcode: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  iva: number;

  @IsNotEmpty()
  presentation: string;

  @IsNotEmpty()
  store_id: string;
}
