// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Infraestructure

// Application

// Domain
import { Dependency } from '../../../domain/entities/dependency.type';
import { DependencyRepository } from '../../../domain/interfaces/dependency.repository.interface';
import { DomainCreateDependencyDto } from 'src/dependency/domain/dto/dependency.create.dto';
import { DomainUpdateDependencyDto } from 'src/dependency/domain/dto/dependency.update.dto';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

@Injectable()
export class DependencyRepositoryImpl implements DependencyRepository {
  constructor(@InjectModel('Dependency') private readonly model: Model<Dependency>) {}

  async findAll(): Promise<Dependency[]> {
    const dependencies = await this.model.find().lean();
    return dependencies;
  }

  async findById(id: number): Promise<Dependency> {
    const register = await this.model.findById(id).lean();
    return register;
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Dependency>> {
    const filters = {
      name: { $regex: pagination.search, $options: 'i' },
    };
    const total = await this.model.find(filters).countDocuments();
    const data = await this.model
      .find(filters)
      .skip(pagination.page * pagination.count)
      .limit(pagination.count);
    return { total, data };
  }

  async create(dependency: DomainCreateDependencyDto): Promise<Dependency> {
    const created = new this.model(dependency);
    return await created.save();
  }

  async update(id: number, dependency: DomainUpdateDependencyDto): Promise<Dependency> {
    return await this.model.findByIdAndUpdate(id, dependency, { new: true }).exec();
  }
}
