// Nest

// Domain
import { DomainCreateSaleDto } from "../dto/sale.create.dto";
import { DomainUpdateSaleDto } from "../dto/sale.update.dto";
import { Sale } from "../entities/sale.type";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { DomainFilterSaleDto } from "../dto/sale.filter.dto";
import { DomainCreateSubSaleDto } from "../dto/sale.subsale_create.dto";
import { DomainCreateSaleOrderDto } from "../dto/sale.order_create.dto";
import { DomainActiveSaleDto } from "../dto/sale.active.dto";

export interface SaleService {
  findById(_id: string): Promise<Sale>;
  findPaginated(
    pagination: DomainPaginationDto & DomainFilterSaleDto
  ): Promise<PaginatedResultInterface<Sale>>;
  findActive(): Promise<DomainActiveSaleDto[]>;
  create(sale: DomainCreateSaleDto): Promise<Sale>;
  createSubSale(subsale: DomainCreateSubSaleDto): Promise<Sale>;
  createOrder(order: DomainCreateSaleOrderDto): Promise<Sale>;
  export(filters: DomainFilterSaleDto): Promise<Buffer>;
  exportById(_id: string): Promise<Buffer>;
  update(_id: string, sale: DomainUpdateSaleDto): Promise<Sale>;
}
