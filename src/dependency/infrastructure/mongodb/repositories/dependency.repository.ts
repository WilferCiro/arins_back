// Nestjs
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

// Infraestructure

// Application

// Domain
import { Dependency } from "../../../domain/entities/dependency.type";
import { DependencyRepository } from "../../../domain/interfaces/dependency.repository.interface";
import { DomainCreateDependencyDto } from "src/dependency/domain/dto/dependency.create.dto";
import { DomainUpdateDependencyDto } from "src/dependency/domain/dto/dependency.update.dto";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";

@Injectable()
export class DependencyRepositoryImpl implements DependencyRepository {
  constructor(
    @InjectModel("Dependency") private readonly model: Model<Dependency>
  ) {}

  async findAll(): Promise<Dependency[]> {
    const dependencies = await this.model.find().lean();
    return dependencies;
  }

  async findById(_id: string): Promise<Dependency> {
    const register = await this.model.findById(_id).lean();
    return register;
  }

  async findPaginated(
    pagination: DomainPaginationDto,
    company_id: string
  ): Promise<PaginatedResultInterface<Dependency>> {
    const filters = {
      company: new Types.ObjectId(company_id),
      $or: [
        { name: { $regex: pagination.search, $options: "i" } },
        { code: { $regex: pagination.search, $options: "i" } },
        { description: { $regex: pagination.search, $options: "i" } },
      ],
    };
    const total = await this.model.find(filters).countDocuments();
    const data = await this.model
      .find(filters)
      .skip(pagination.page * pagination.count)
      .limit(pagination.count)
      .populate({
        path: "company",
        select: "name _id",
      })
      .lean();
    return { total, data };
  }

  async findSelect(query: string, company_id: string): Promise<Dependency[]> {
    const filters = {
      company: new Types.ObjectId(company_id),
      name: { $regex: query, $options: "i" },
    };
    const data = await this.model.find(filters).lean();
    return data;
  }

  async create(
    dependency: DomainCreateDependencyDto,
    company_id: string
  ): Promise<Dependency> {
    const newData = {
      ...dependency,
      company: new Types.ObjectId(company_id),
      company_id: undefined,
    };
    const created = new this.model(newData);
    return await created.save();
  }

  async update(
    _id: string,
    dependency: DomainUpdateDependencyDto
  ): Promise<Dependency> {
    return await this.model
      .findByIdAndUpdate(_id, dependency, { new: true })
      .exec();
  }
}
