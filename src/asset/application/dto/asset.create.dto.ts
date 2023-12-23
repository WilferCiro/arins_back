import { IsNotEmpty } from 'class-validator';

export class CreateAssetDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  active: boolean;
}
