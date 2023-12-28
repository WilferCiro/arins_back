import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSellDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  @IsOptional()
  active?: boolean;
}
