// Nestjs
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

// Infraestructure

// Application

// Domain
import { Store } from "../../../domain/entities/store.type";
import { StoreRepository } from "../../../domain/interfaces/store.repository.interface";
import { DomainCreateStoreDto } from "src/store/domain/dto/store.create.dto";
import { DomainUpdateStoreDto } from "src/store/domain/dto/store.update.dto";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";

@Injectable()
export class StoreRepositoryImpl implements StoreRepository {
  constructor(@InjectModel("Store") private readonly model: Model<Store>) {}

  async findAll(company_id: string): Promise<Store[]> {
    const stores = await this.model.find({company: new Types.ObjectId(company_id)}).lean();
    return stores;
  }

  async findById(_id: string): Promise<Store> {
    const register = await this.model.findById(_id).lean();
    return register;
  }

  async findPaginated(
    pagination: DomainPaginationDto,
    company_id: string
  ): Promise<PaginatedResultInterface<Store>> {
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

  async findSelect(query: string, company_id: string): Promise<Store[]> {
    const filters = {
      company: new Types.ObjectId(company_id),
      name: { $regex: query, $options: "i" },
    };
    const data = await this.model.find(filters).lean();
    return data;
  }

  async create(
    store: DomainCreateStoreDto,
    company_id: string
  ): Promise<Store> {
    const newData = {
      ...store,
      company: new Types.ObjectId(company_id),
      company_id: undefined,
    };
    const created = new this.model(newData);
    return await created.save();
  }

  async update(_id: string, store: DomainUpdateStoreDto): Promise<Store> {
    return await this.model.findByIdAndUpdate(_id, store, { new: true }).exec();
  }
}
