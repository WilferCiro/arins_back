// Nest
import { Inject, Injectable } from "@nestjs/common";

// Application

// Domain
import { Sale } from "src/sale/domain/entities/sale.type";
import { SaleRepository } from "src/sale/domain/interfaces/sale.repository.interface";
import { SaleService } from "src/sale/domain/interfaces/sale.service.interface";
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { DomainCreateSaleDto } from "src/sale/domain/dto/sale.create.dto";
import { DomainUpdateSaleDto } from "src/sale/domain/dto/sale.update.dto";

// Shared
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { DomainFilterSaleDto } from "src/sale/domain/dto/sale.filter.dto";
import { salesExcelHeaders } from "../constants/sales.excel_header";
import { FilesServiceInterface } from "src/modules/files/domain/interfaces/files.service.interface";
import { saleIdExcelHeaders } from "../constants/sale_id.excel_header";
import { DomainCreateSubSaleDto } from "src/sale/domain/dto/sale.subsale_create.dto";
import { ProductService } from "src/product/domain/interfaces/product.service.interface";
import { DomainCreateSaleOrderDto } from "src/sale/domain/dto/sale.order_create.dto";
import { StoreService } from "src/store/domain/interfaces/store.service.interface";
import { DomainActiveSaleDto } from "src/sale/domain/dto/sale.active.dto";
import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
dayjs.extend(utc);

@Injectable()
export class SaleServiceImpl implements SaleService {
  constructor(
    @Inject("SaleRepository")
    private readonly repository: SaleRepository,
    @Inject("FilesService")
    private readonly filesService: FilesServiceInterface,
    @Inject("ProductService")
    private readonly productService: ProductService,
    @Inject("StoreService")
    private readonly storeService: StoreService
  ) {}

  async findById(_id: string): Promise<Sale> {
    return await this.repository.findById(_id);
  }

  async findPaginated(
    pagination: DomainPaginationDto & DomainFilterSaleDto
  ): Promise<PaginatedResultInterface<Sale>> {
    return await this.repository.findPaginated(pagination);
  }

  async findActive(): Promise<DomainActiveSaleDto[]> {
    const stores = await this.storeService.findAll();

    const dataPromises = stores.map(async (store) => {
      const sale = await this.repository.findByFilter({
        createdAt: [
          dayjs().startOf("day").utc().toDate(),
          dayjs().endOf("day").utc().toDate(),
        ],
        store_id: store._id,
      });
      return {
        store: {
          _id: store._id,
          name: store.name,
        },
        active: sale.length > 0,
        sale: sale?.[0]?._id,
      };
    });

    const data = await Promise.all(dataPromises);

    return data;
  }

  async create(sale: DomainCreateSaleDto): Promise<Sale> {
    return await this.repository.create(sale);
  }

  async createSubSale(subsale: DomainCreateSubSaleDto): Promise<Sale> {
    const productPromises = subsale.products.map(async (product) => {
      const productObj = await this.productService.findById(product._id);
      return { product: productObj, quantity: product.quantity };
    });
    const products = await Promise.all(productPromises);

    const sale = await this.repository.createSubSale(products, subsale.sale_id);
    return sale;
  }

  async createOrder(order: DomainCreateSaleOrderDto): Promise<Sale> {
    const sale = await this.repository.createOrder(order);
    return sale;
  }

  async export(filters: DomainFilterSaleDto): Promise<Buffer> {
    const data = await this.repository.findByFilter(filters);
    const columns = salesExcelHeaders;
    const dataExcel = data.map((row) => ({
      createdAt: row.createdAt,
      initialMoney: row.initialMoney,
      totalSales: 0,
      totalOrders: 0,
      finalMoney: 0,
      countSales: row.sales.length,
      countOrders: row.orders.length,
    }));
    return this.filesService.generateExcel(dataExcel, columns);
  }
  async exportById(_id: string): Promise<Buffer> {
    const data = await this.repository.findById(_id);
    const columns = saleIdExcelHeaders;
    const dataExcel = [];
    data.orders.forEach((order) => {
      dataExcel.push({
        orderPrice: order.price,
        orderDate: order.date,
      });
    });
    data.sales
      .flatMap((d) => d.products)
      .forEach((product) => {
        dataExcel.push({
          product: product.name,
          productPrice: product.price,
          productQuantity: product.quantity,
          productTotal: product.quantity * product.price,
        });
      });
    return this.filesService.generateExcel(dataExcel, columns);
  }

  async update(_id: string, sale: DomainUpdateSaleDto): Promise<Sale> {
    return await this.repository.update(_id, sale);
  }
}
