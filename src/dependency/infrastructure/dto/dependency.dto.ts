import { CompanyDto } from "src/company/infrastructure/dto/company.dto";

export interface DependencyDto {
  id?: number;
  name: string;
  description: string;
  code: string;
  company: CompanyDto;
  company_id?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
