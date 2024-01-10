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

  private getFilters(filters: DomainFilterProductDto) {
    return {
      ...(filters.store_id
        ? {
            "store._id": {
              $in: filters.store_id.map((id) => new Types.ObjectId(id)),
            },
          }
        : {}),
      ...(filters.search
        ? {
            name: { $regex: filters.search, $options: "i" },
          }
        : {}),
    };
  }

  private getAggregationsFilters(
    filters: Record<string, any>,
    company_id: string
  ) {
    return [
      {
        $lookup: {
          from: "stores",
          localField: "store",
          foreignField: "_id",
          as: "store",
        },
      },
      {
        $unwind: {
          path: "$store",
        },
      },
      {
        $match: { ...filters, "store.company": new Types.ObjectId(company_id) },
      },
    ];
  }

  async findByStoreId(store_id: string): Promise<Product[]> {
    const products = await this.model
      .find({ store: new Types.ObjectId(store_id) })
      .lean();
    return products;
  }

  async findById(_id: string, company_id: string): Promise<Product> {
    const aggregations = this.getAggregationsFilters({ _id }, company_id);
    const register = await this.model.aggregate(aggregations);
    return register?.[0];
  }

  async findPaginated(
    pagination: DomainPaginationDto & DomainFilterProductDto,
    company_id: string
  ): Promise<PaginatedResultInterface<Product>> {
    const filters = this.getFilters(pagination);
    const aggregations: any = this.getAggregationsFilters(filters, company_id);
    const total = await this.model.aggregate([
      ...aggregations,
      { $count: "total" },
    ]);

    aggregations.push(
      ...[
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $skip: pagination.page * pagination.count,
        },
        {
          $limit: +pagination.count,
        },
      ]
    );
    const data = await this.model.aggregate(aggregations);
    return { total: total?.[0]?.total, data };
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

  async findByFilter(
    filter: DomainFilterProductDto,
    company_id: string
  ): Promise<Product[]> {
    const filters = this.getFilters(filter);
    const aggregations: any = this.getAggregationsFilters(filters, company_id);
    return await this.model.aggregate(aggregations);
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
