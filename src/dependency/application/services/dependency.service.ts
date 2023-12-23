// Nest
import { Inject, Injectable } from '@nestjs/common';

// Application

// Domain
import { Dependency } from 'src/dependency/domain/entities/dependency.type';
import { DependencyRepository } from 'src/dependency/domain/interfaces/dependency.repository.interface';
import { DependencyService } from 'src/dependency/domain/interfaces/dependency.service.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { DomainCreateDependencyDto } from 'src/dependency/domain/dto/dependency.create.dto';
import { DomainUpdateDependencyDto } from 'src/dependency/domain/dto/dependency.update.dto';

// Shared
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

@Injectable()
export class DependencyServiceImpl implements DependencyService {
  constructor(
    @Inject('DependencyRepository')
    private readonly repository: DependencyRepository,
  ) {}

  async findAll(): Promise<Dependency[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<Dependency> {
    return await this.repository.findById(id);
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Dependency>> {
    return await this.repository.findPaginated(pagination);
  }

  async create(dependency: DomainCreateDependencyDto): Promise<Dependency> {
    return await this.repository.create(dependency);
  }

  async update(id: number, dependency: DomainUpdateDependencyDto): Promise<Dependency> {
    return await this.repository.update(id, dependency);
  }
}
