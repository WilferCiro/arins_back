// Nestjs
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// Infraestructure

// Application

// Domain
import { Sale } from "../../../domain/entities/sale.type";
import { SaleRepository } from "../../../domain/interfaces/sale.repository.interface";
import { DomainCreateSaleDto } from "src/sale/domain/dto/sale.create.dto";
import { DomainUpdateSaleDto } from "src/sale/domain/dto/sale.update.dto";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { DomainFilterSaleDto } from "src/sale/domain/dto/sale.filter.dto";

@Injectable()
export class SaleRepositoryImpl implements SaleRepository {
  constructor(@InjectModel("Sale") private readonly model: Model<Sale>) {}

  async findAll(): Promise<Sale[]> {
    const sales = await this.model.find().lean();
    return sales;
  }

  async findById(_id: string): Promise<Sale> {
    const register = await this.model.findById(_id).lean();
    return register;
  }

  async findPaginated(
    pagination: DomainPaginationDto & DomainFilterSaleDto
  ): Promise<PaginatedResultInterface<Sale>> {
    console.log(pagination.createdAt);
    const filters = pagination.createdAt
      ? {
          createdAt: {
            $lte: pagination.createdAt[1].toISOString(),
            $gte: pagination.createdAt[0].toISOString(),
          },
        }
      : {};
    const total = await this.model.find(filters).countDocuments();
    const data = await this.model
      .find(filters)
      .skip(pagination.page * pagination.count)
      .limit(pagination.count)
      .lean();
    return { total, data };
  }

  async create(sale: DomainCreateSaleDto): Promise<Sale> {
    const newData = {
      ...sale,
      sales: [],
      orders: [],
    };
    const created = new this.model(newData);
    return await created.save();
  }

  async update(_id: string, sale: DomainUpdateSaleDto): Promise<Sale> {
    return await this.model.findByIdAndUpdate(_id, sale, { new: true }).exec();
  }
}
