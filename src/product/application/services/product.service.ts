// Nest
import { Inject, Injectable } from "@nestjs/common";

// Application

// Domain
import { Product } from "src/product/domain/entities/product.type";
import { ProductRepository } from "src/product/domain/interfaces/product.repository.interface";
import { ProductService } from "src/product/domain/interfaces/product.service.interface";
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { DomainCreateProductDto } from "src/product/domain/dto/product.create.dto";
import { DomainUpdateProductDto } from "src/product/domain/dto/product.update.dto";

// Shared
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { DomainFilterProductDto } from "src/product/domain/dto/product.filter.dto";
import { productExcelHeaders } from "../constants/products.excel_header";
import { FilesServiceInterface } from "src/modules/files/domain/interfaces/files.service.interface";

@Injectable()
export class ProductServiceImpl implements ProductService {
  constructor(
    @Inject("ProductRepository")
    private readonly repository: ProductRepository,
    @Inject("FilesService")
    private readonly filesService: FilesServiceInterface
  ) {}

  async findAll(store_id: string): Promise<Product[]> {
    return await this.repository.findByStoreId(store_id);
  }

  async findById(_id: string): Promise<Product> {
    return await this.repository.findById(_id);
  }

  async findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<Product>> {
    return await this.repository.findPaginated(pagination);
  }

  async create(product: DomainCreateProductDto): Promise<Product> {
    return await this.repository.create(product);
  }

  async createMassive(assets: DomainCreateProductDto[]): Promise<number> {
    return await this.repository.createMassive(assets);
  }

  async export(filters: DomainFilterProductDto): Promise<Buffer> {
    const data = await this.repository.findByFilter(filters);
    const newData = data.map((dep) => ({
      ...dep,
      store: dep.store.name,
      store_id: undefined,
    }));
    const columns = productExcelHeaders;
    return this.filesService.generateExcel(newData, columns);
  }

  async update(_id: string, product: DomainUpdateProductDto): Promise<Product> {
    return await this.repository.update(_id, product);
  }
}
