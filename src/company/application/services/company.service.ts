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
import { RequestContextService } from "src/modules/context/domain/interfaces/context.service.interface";
import * as dayjs from "dayjs";

@Injectable()
export class CompanyServiceImpl implements CompanyService {
  constructor(
    @Inject("CompanyRepository")
    private readonly repository: CompanyRepository,
    @Inject("RequestContext")
    private readonly contextService: RequestContextService
  ) {}

  async findAll(): Promise<Company[]> {
    return await this.repository.findAll();
  }

  async findCurrent(): Promise<Company | null> {
    const company_id = this.contextService.get<string | undefined>("company");
    return await this.findById(company_id);
  }

  async findById(_id: string): Promise<Company> {
    return await this.repository.findById(_id);
  }

  async getByAdminId(_id: string): Promise<Company[]> {
    return await this.repository.getByAdminId(_id);
  }

  async findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<Company>> {
    return await this.repository.findPaginated(pagination);
  }

  async findSelect(query: string): Promise<Company[]> {
    return await this.repository.findSelect(query);
  }

  async create(company: DomainCreateCompanyDto): Promise<Company> {
    const user_id = this.contextService.get<string | undefined>("user_id");
    company.user_id = user_id;
    company.active = true;
    company.access = {
      inventory: {
        price: 30000,
        expiration: dayjs().add(7, 'day').toDate()
      },
      sales: {
        price: 30000,
        expiration: dayjs().add(7, 'day').toDate()
      },
      entry: {
        price: 30000,
        expiration: dayjs().add(7, 'day').toDate()
      }
    }
    return await this.repository.create(company);
  }

  async update(_id: string, company: DomainUpdateCompanyDto): Promise<Company> {
    return await this.repository.update(_id, company);
  }
}
