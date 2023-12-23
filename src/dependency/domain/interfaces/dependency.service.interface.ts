// Nest

// Domain
import { DomainCreateDependencyDto } from '../dto/dependency.create.dto';
import { DomainUpdateDependencyDto } from '../dto/dependency.update.dto';
import { Dependency } from '../entities/dependency.type';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

export interface DependencyService {
  findById(id: number): Promise<Dependency>;
  findAll(): Promise<Dependency[]>;
  findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Dependency>>;
  create(dependency: DomainCreateDependencyDto): Promise<Dependency>;
  update(id: number, dependency: DomainUpdateDependencyDto): Promise<Dependency>;
}
