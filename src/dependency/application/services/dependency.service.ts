// Nest
import { Inject, Injectable } from "@nestjs/common";

// Application

// Domain
import { Dependency } from "src/dependency/domain/entities/dependency.type";
import { DependencyRepository } from "src/dependency/domain/interfaces/dependency.repository.interface";
import { DependencyService } from "src/dependency/domain/interfaces/dependency.service.interface";
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { DomainCreateDependencyDto } from "src/dependency/domain/dto/dependency.create.dto";
import { DomainUpdateDependencyDto } from "src/dependency/domain/dto/dependency.update.dto";

// Shared
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { RequestContextService } from "src/modules/context/domain/interfaces/context.service.interface";

@Injectable()
export class DependencyServiceImpl implements DependencyService {
  constructor(
    @Inject("DependencyRepository")
    private readonly repository: DependencyRepository,
    @Inject("RequestContext")
    private readonly contextService: RequestContextService
  ) {}

  async findAll(): Promise<Dependency[]> {
    return await this.repository.findAll();
  }

  async findById(_id: string): Promise<Dependency> {
    return await this.repository.findById(_id);
  }

  async findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<Dependency>> {
    const company_id = this.contextService.get<string | undefined>("company");
    return await this.repository.findPaginated(pagination, company_id);
  }

  async findSelect(query: string): Promise<Dependency[]> {
    const company_id = this.contextService.get<string | undefined>("company");
    return await this.repository.findSelect(query, company_id);
  }

  async create(dependency: DomainCreateDependencyDto): Promise<Dependency> {
    const company_id = this.contextService.get<string | undefined>("company");
    return await this.repository.create(dependency, company_id);
  }

  async update(
    _id: string,
    dependency: DomainUpdateDependencyDto
  ): Promise<Dependency> {
    return await this.repository.update(_id, dependency);
  }
}
