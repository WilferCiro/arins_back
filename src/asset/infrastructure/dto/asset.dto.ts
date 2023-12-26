import { DependencyDto } from "src/dependency/infrastructure/dto/dependency.dto";

export interface AssetDto {
  id?: number;
  name: string;
  description: string;
  plate: string;
  serial: string;
  category: string;
  price: number;
  acquisitionDate: Date;
  dependency: DependencyDto;
  dependency_id: string;
  assessment: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
