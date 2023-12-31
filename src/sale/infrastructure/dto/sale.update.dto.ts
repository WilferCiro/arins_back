import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSaleDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  @IsOptional()
  active?: boolean;
}
