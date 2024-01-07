// Nest

// Domain

// Shared
import { DomainGenerateReportDto } from "../dto/inventoryReport.generate.dto";

export interface InventoryReportService {
  generate(data: DomainGenerateReportDto): Promise<Buffer>;
}
