// Nest

// Domain
import { DomainCreateCompanyDto } from "../dto/company.create.dto";
import { DomainUpdateCompanyDto } from "../dto/company.update.dto";
import { Company } from "../entities/company.type";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";

export interface CompanyService {
  findById(_id: string): Promise<Company>;
  findAll(): Promise<Company[]>;
  getByAdminId(_id: string): Promise<Company[]>;
  findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<Company>>;

  findSelect(query: string): Promise<Company[]>;
  create(company: DomainCreateCompanyDto): Promise<Company>;
  update(_id: string, company: DomainUpdateCompanyDto): Promise<Company>;
}
