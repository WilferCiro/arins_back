// Nest
import {
  Body,
  Controller,
  Header,
  Inject,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";

// Application
import { InventoryReportMapper } from "../mapper/inventoryReport.mapper";
import { GenerateReportDto } from "../dto/inventoryReport.generate.dto";
// Domain
import { InventoryReportService } from "src/inventoryReport/domain/interfaces/inventoryReport.service.interface";

// Shared
import { BaseController } from "src/shared/application/controllers/base.controller";
import { AuthGuard } from "src/shared/infrastructure/middleware/auth.middleware";
import { PaginationMapper } from "src/shared/application/mapper/pagination.mapper";
import { Response } from "express";

@Controller("inventoryReports")
export class InventoryReportController extends BaseController {
  private mapper: InventoryReportMapper;
  constructor(
    @Inject("InventoryReportService")
    private readonly service: InventoryReportService
  ) {
    super();
    this.mapper = new InventoryReportMapper();
  }

  @UseGuards(AuthGuard)
  @Post("generate")
  @Header(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  )
  @Header("Content-Disposition", "attachment; filename=users.xlsx")
  async genereteReports(
    @Body() reportData: GenerateReportDto,
    @Res() res: Response
  ) {
    const data = await this.service.generate(
      this.mapper.toGenerateDomain(reportData)
    );
    res.send(data);
  }
}
