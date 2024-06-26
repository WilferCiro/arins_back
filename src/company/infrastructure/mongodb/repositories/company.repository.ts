// Nestjs
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

// Infraestructure

// Application

// Domain
import { Company } from "../../../domain/entities/company.type";
import { CompanyRepository } from "../../../domain/interfaces/company.repository.interface";
import { DomainCreateCompanyDto } from "src/company/domain/dto/company.create.dto";
import { DomainUpdateCompanyDto } from "src/company/domain/dto/company.update.dto";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";

@Injectable()
export class CompanyRepositoryImpl implements CompanyRepository {
  constructor(@InjectModel("Company") private readonly model: Model<Company>) {}

  async findAll(): Promise<Company[]> {
    const companies = await this.model.find().lean();
    return companies;
  }

  async findById(_id: string): Promise<Company> {
    const register = await this.model.findById(_id).lean();
    return register;
  }
  async getByAdminId(_id: string): Promise<Company[]> {
    const register = await this.model
      .find({ admin: new Types.ObjectId(_id) })
      .lean();
    return register;
  }

  async findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<Company>> {
    const filters = {
      name: { $regex: pagination.search, $options: "i" },
    };
    const total = await this.model.find(filters).countDocuments();
    const data = await this.model
      .find(filters)
      .skip(pagination.page * pagination.count)
      .limit(pagination.count);
    return { total, data };
  }

  async findSelect(query: string): Promise<Company[]> {
    const filters = {
      name: { $regex: query, $options: "i" },
    };
    const data = await this.model.find(filters).lean();
    return data;
  }

  async create(company: DomainCreateCompanyDto): Promise<Company> {
    const newCompany = {
      ...company,
      admin: new Types.ObjectId(company.user_id),
      user_id: undefined,
    }
    const created = new this.model(newCompany);
    return await created.save();
  }

  async update(_id: string, company: DomainUpdateCompanyDto): Promise<Company> {
    return await this.model
      .findByIdAndUpdate(_id, company, { new: true })
      .exec();
  }
}
