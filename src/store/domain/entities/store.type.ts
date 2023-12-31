import { Company } from "src/company/domain/entities/company.type";

export class Store {
  _id?: string;
  name: string;
  description: string;
  code: string;
  company: Company;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
