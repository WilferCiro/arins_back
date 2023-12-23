import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAssetDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  @IsOptional()
  active?: boolean;
}
