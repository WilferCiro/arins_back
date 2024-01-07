// Nest

// Domain
import { DomainCreateInventoryReportDto } from '../dto/inventoryReport.create.dto';
import { DomainUpdateInventoryReportDto } from '../dto/inventoryReport.update.dto';
import { InventoryReport } from '../entities/inventoryReport.type';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

export interface InventoryReportRepository {
  findById(id: number): Promise<InventoryReport>;
  findAll(): Promise<InventoryReport[]>;
  findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<InventoryReport>>;

  create(inventoryReport: DomainCreateInventoryReportDto): Promise<InventoryReport>;
  update(id: number, inventoryReport: DomainUpdateInventoryReportDto): Promise<InventoryReport>;
}
