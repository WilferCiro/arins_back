import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateSaleOrderDto {
  @IsNotEmpty()
  sale_id: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  description?: string;
}
