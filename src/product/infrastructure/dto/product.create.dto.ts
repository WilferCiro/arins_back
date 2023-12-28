import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

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

  @IsNotEmpty()
  presentation: string;

  @IsNotEmpty()
  store_id: string;
}
