// Nest

// Domain
import { DomainCreateDependencyDto } from "../dto/dependency.create.dto";
import { DomainUpdateDependencyDto } from "../dto/dependency.update.dto";
import { Dependency } from "../entities/dependency.type";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";

export interface DependencyRepository {
  findById(_id: string): Promise<Dependency>;
  findAll(): Promise<Dependency[]>;
  findPaginated(
    pagination: DomainPaginationDto,
    company_id: string
  ): Promise<PaginatedResultInterface<Dependency>>;
  findSelect(query: string, company_id: string): Promise<Dependency[]>;
  create(
    dependency: DomainCreateDependencyDto,
    company_id: string
  ): Promise<Dependency>;
  update(
    _id: string,
    dependency: DomainUpdateDependencyDto
  ): Promise<Dependency>;
}
