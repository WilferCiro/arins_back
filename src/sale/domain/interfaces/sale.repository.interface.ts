// Nest

// Domain
import { DomainCreateSaleDto } from "../dto/sale.create.dto";
import { DomainUpdateSaleDto } from "../dto/sale.update.dto";
import { Sale } from "../entities/sale.type";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { DomainFilterSaleDto } from "../dto/sale.filter.dto";

export interface SaleRepository {
  findById(_id: string): Promise<Sale>;
  findAll(): Promise<Sale[]>;
  findPaginated(
    pagination: DomainPaginationDto & DomainFilterSaleDto
  ): Promise<PaginatedResultInterface<Sale>>;

  create(sale: DomainCreateSaleDto): Promise<Sale>;
  update(_id: string, sale: DomainUpdateSaleDto): Promise<Sale>;
}
