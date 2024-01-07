// Nest
import { Injectable } from "@nestjs/common";

// Application

// Domain
import { GenerateReportDto } from "../dto/inventoryReport.generate.dto";
import { DomainGenerateReportDto } from "src/inventoryReport/domain/dto/inventoryReport.generate.dto";

// Shared

@Injectable()
export class InventoryReportMapper {
  toGenerateDomain(
    generateReportDto: GenerateReportDto
  ): DomainGenerateReportDto {
    const { type } = generateReportDto;
    return { type };
  }
}
