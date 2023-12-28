import { IsNotEmpty } from 'class-validator';

export class CreateSellDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  active: boolean;
}
