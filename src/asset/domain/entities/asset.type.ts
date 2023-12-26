import { Dependency } from "src/dependency/domain/entities/dependency.type";

export class Asset {
  id?: number;
  name: string;
  description: string;
  plate: string;
  serial: string;
  category: string;
  price: number;
  acquisitionDate: Date;
  dependency: Dependency;
  dependency_id: string;
  assessment: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
