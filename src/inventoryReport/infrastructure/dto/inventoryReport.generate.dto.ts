import { IsIn, IsNotEmpty } from "class-validator";

export class GenerateReportDto {
  @IsNotEmpty()
  @IsIn(["contable", "bajas"])
  type: string;
}
