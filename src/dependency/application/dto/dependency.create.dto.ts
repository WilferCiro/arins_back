import { IsNotEmpty } from 'class-validator';

export class CreateDependencyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  active: boolean;
}
