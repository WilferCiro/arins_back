// Nest
import { Inject, Injectable } from "@nestjs/common";

// Application

// Domain
import { Company } from "src/company/domain/entities/company.type";
import { CompanyRepository } from "src/company/domain/interfaces/company.repository.interface";
import { CompanyService } from "src/company/domain/interfaces/company.service.interface";
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { DomainCreateCompanyDto } from "src/company/domain/dto/company.create.dto";
import { DomainUpdateCompanyDto } from "src/company/domain/dto/company.update.dto";

// Shared
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";

@Injectable()
export class CompanyServiceImpl implements CompanyService {
  constructor(
    @Inject("CompanyRepository")
    private readonly repository: CompanyRepository
  ) {}

  async findAll(): Promise<Company[]> {
    return await this.repository.findAll();
  }

  async findById(_id: string): Promise<Company> {
    return await this.repository.findById(_id);
  }

  async findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<Company>> {
    return await this.repository.findPaginated(pagination);
  }

  async create(company: DomainCreateCompanyDto): Promise<Company> {
    return await this.repository.create(company);
  }

  async update(_id: string, company: DomainUpdateCompanyDto): Promise<Company> {
    return await this.repository.update(_id, company);
  }
}
