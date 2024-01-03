import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";

export class FilterSaleDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value;
    }
    const dates = value.split(",").map((date: string) => new Date(date));
    if (dates.findIndex((dt) => dt === undefined || isNaN(dt)) !== -1) {
      return undefined;
    }
    return dates;
  })
  createdAt?: [Date, Date];

  @IsNotEmpty()
  store_id: string;
}
