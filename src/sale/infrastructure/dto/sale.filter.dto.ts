import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";

export class FilterSaleDto {
  @IsOptional()
  @Transform(({ value }) => {
    return value.split(",").map((date: string) => new Date(date));
  })
  createdAt?: [Date, Date];
}
