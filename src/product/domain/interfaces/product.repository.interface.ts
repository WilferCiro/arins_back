// Nest

// Domain
import { DomainCreateProductDto } from "../dto/product.create.dto";
import { DomainUpdateProductDto } from "../dto/product.update.dto";
import { Product } from "../entities/product.type";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { DomainFilterProductDto } from "../dto/product.filter.dto";

export interface ProductRepository {
  findById(_id: string, company_id: string): Promise<Product>;
  findByStoreId(store_id: string): Promise<Product[]>;
  findPaginated(
    pagination: DomainPaginationDto,
    company_id: string
  ): Promise<PaginatedResultInterface<Product>>;

  create(product: DomainCreateProductDto): Promise<Product>;
  createMassive(product: DomainCreateProductDto[]): Promise<number>;
  findByFilter(filters: DomainFilterProductDto, company_id: string): Promise<Product[]>;
  update(_id: string, product: DomainUpdateProductDto): Promise<Product>;
}
