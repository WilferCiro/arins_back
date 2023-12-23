import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateDependencyDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  @IsOptional()
  active?: boolean;
}
