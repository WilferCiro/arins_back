// Nestjs
import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

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
import { DomainCreateSubSaleDto } from "src/sale/domain/dto/sale.subsale_create.dto";
import { Product } from "src/product/domain/entities/product.type";
import { Type } from "class-transformer";
import { DomainCreateSaleOrderDto } from "src/sale/domain/dto/sale.order_create.dto";

@Injectable()
export class SaleRepositoryImpl implements SaleRepository {
  constructor(@InjectModel("Sale") private readonly model: Model<Sale>) {}

  async findByFilter(filter: DomainFilterSaleDto): Promise<Sale[]> {
    const filtersDB = this.formatFilters(filter);
    const sales = await this.model.find(filtersDB).lean();
    return sales;
  }

  async findById(_id: string): Promise<Sale> {
    const register = await this.model
      .findById(_id)
      .populate({
        path: "store",
        select: "name _id",
      })
      .lean();
    return register;
  }

  private formatFilters(filter: DomainFilterSaleDto) {
    const filterDB = {
      store: new Types.ObjectId(filter.store_id),
      ...(filter.createdAt && filter.createdAt.length > 0
        ? {
            createdAt: {
              $lte: filter.createdAt[1].toISOString(),
              $gte: filter.createdAt[0].toISOString(),
            },
          }
        : {}),
    };
    return filterDB;
  }

  async findPaginated(
    pagination: DomainPaginationDto & DomainFilterSaleDto
  ): Promise<PaginatedResultInterface<Sale>> {
    const filters = this.formatFilters(pagination);
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

  async create(sale: DomainCreateSaleDto): Promise<Sale> {
    const newData = {
      initialMoney: sale.initialMoney,
      store: new Types.ObjectId(sale.store_id),
      sales: [],
      orders: [],
    };
    const created = new this.model(newData);
    return await created.save();
  }

  async createSubSale(
    products: { product: Product; quantity: number }[],
    sale_id: string
  ): Promise<Sale> {
    const sale = await this.model.findById(sale_id).lean();
    if (!sale) {
      throw new HttpException("No existe la venta", 400);
    }
    const prods = products.map((product) => ({
      original: product.product,
      original_id: product.product._id,
      name: product.product.name,
      price: product.product.price,
      quantity: product.quantity,
      iva: product.product.iva,
    }));
    sale.sales.push({
      products: prods,
      date: new Date(),
    });
    const finalSale = await this.model
      .findByIdAndUpdate(sale_id, sale, { new: true })
      .exec();
    return finalSale;
  }

  async createOrder(order: DomainCreateSaleOrderDto): Promise<Sale> {
    const sale = await this.model.findById(order.sale_id).lean();
    if (!sale) {
      throw new HttpException("No existe la venta", 400);
    }
    sale.orders.push({
      date: new Date(),
      description: order?.description || "",
      price: order.price,
    });
    const finalSale = await this.model
      .findByIdAndUpdate(order.sale_id, sale, { new: true })
      .exec();
    return finalSale;
  }

  async update(_id: string, sale: DomainUpdateSaleDto): Promise<Sale> {
    return await this.model.findByIdAndUpdate(_id, sale, { new: true }).exec();
  }
}
