import { ArrayMinSize, IsNotEmpty, IsNumber } from "class-validator";

class ProductDto {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class CreateSaleOrderDto {
  @ArrayMinSize(1, { message: "Debe haber al menos un producto en la lista." })
  products: ProductDto[];
}
