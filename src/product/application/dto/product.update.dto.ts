import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  @IsOptional()
  active?: boolean;
}
