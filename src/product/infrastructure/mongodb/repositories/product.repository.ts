// Nestjs
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

// Infraestructure

// Application

// Domain
import { Product } from "../../../domain/entities/product.type";
import { ProductRepository } from "../../../domain/interfaces/product.repository.interface";
import { DomainCreateProductDto } from "src/product/domain/dto/product.create.dto";
import { DomainUpdateProductDto } from "src/product/domain/dto/product.update.dto";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { DomainFilterProductDto } from "src/product/domain/dto/product.filter.dto";

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(@InjectModel("Product") private readonly model: Model<Product>) {}

  async findByStoreId(store_id: string): Promise<Product[]> {
    const products = await this.model
      .find({ store: new Types.ObjectId(store_id) })
      .lean();
    return products;
  }

  async findById(_id: string): Promise<Product> {
    const register = await this.model.findById(_id).lean();
    return register;
  }

  async findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<Product>> {
    const filters = {
      name: { $regex: pagination.search, $options: "i" },
    };
    const total = await this.model.find(filters).countDocuments();
    const data = await this.model
      .find(filters)
      .sort({ createdAt: -1 })
      .skip(pagination.page * pagination.count)
      .limit(pagination.count)
      .populate({
        path: "store",
        select: "name _id",
      })
      .lean();
    return { total, data };
  }

  async create(product: DomainCreateProductDto): Promise<Product> {
    const newData = {
      ...product,
      store: new Types.ObjectId(product.store_id),
      store_id: undefined,
    };
    const created = new this.model(newData);
    return await created.save();
  }
  async createMassive(products: DomainCreateProductDto[]): Promise<number> {
    const newData = products.map((product) => ({
      ...product,
      store: new Types.ObjectId(product.store_id),
      store_id: undefined,
    }));
    const data = await this.model.insertMany(newData);
    return data.length;
  }

  async findByFilter(filter: DomainFilterProductDto): Promise<Product[]> {
    const { store_id, search } = filter;
    const filterDB = {};
    return await this.model
      .find(filterDB)
      .sort({ createdAt: -1 })
      .populate({
        path: "store",
        select: "name _id",
      })
      .lean();
  }

  async update(_id: string, product: DomainUpdateProductDto): Promise<Product> {
    const newData = {
      ...product,
      ...(product.store_id
        ? { store: new Types.ObjectId(product.store_id) }
        : {}),
      store_id: undefined,
    };
    return await this.model
      .findByIdAndUpdate(_id, newData, { new: true })
      .exec();
  }
}
