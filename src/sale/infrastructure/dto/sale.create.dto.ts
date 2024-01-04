import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateSaleDto {
  @IsNotEmpty()
  @IsNumber()
  initialMoney: number;

  @IsNotEmpty()
  store_id: string;
}
