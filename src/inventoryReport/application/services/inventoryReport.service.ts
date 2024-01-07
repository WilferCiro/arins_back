// Nest
import { Inject, Injectable } from "@nestjs/common";
import { Asset } from "src/asset/domain/entities/asset.type";
import { AssetService } from "src/asset/domain/interfaces/asset.service.interface";

// Application

// Domain
// Shared
import { DomainGenerateReportDto } from "src/inventoryReport/domain/dto/inventoryReport.generate.dto";
import { InventoryReportService } from "src/inventoryReport/domain/interfaces/inventoryReport.service.interface";
import { contableExcelHeaders } from "../constants/assets.excel_header";
import { FilesServiceInterface } from "src/modules/files/domain/interfaces/files.service.interface";

interface InterfaceExcelContable {
  name: string;
  active_number: number;
  active_percent: string;
  inactive_number: number;
  inactive_percent: string;
  baja_number: number;
  baja_percent: string;
  total: number;
}

@Injectable()
export class InventoryReportServiceImpl implements InventoryReportService {
  constructor(
    @Inject("AssetService")
    private readonly assetService: AssetService,
    @Inject("FilesService")
    private readonly filesService: FilesServiceInterface
  ) {}

  private generateContableData = (
    inputArray: Asset[]
  ): { [key: string]: InterfaceExcelContable } => {
    const result: { [key: string]: InterfaceExcelContable } = {};

    inputArray.forEach((item) => {
      const dependency_id = item.dependency._id;
      const status = item.status;
      let baja = status === "Dado de baja" ? 1 : 0;
      let active = status === "Activo" ? 1 : 0;
      let inactive = status === "Inactivo" ? 1 : 0;
      if (!result[dependency_id]) {
        const total = inputArray.filter(
          (input) => input.dependency._id === dependency_id
        ).length;
        result[dependency_id] = {
          name: item.dependency.name,
          baja_number: baja,
          baja_percent: `${baja * (100 / total)}%`,
          active_number: active,
          active_percent: `${active * (100 / total)}%`,
          inactive_number: inactive,
          inactive_percent: `${inactive * (100 / total)}%`,
          total,
        };
      } else {
        const total = result[dependency_id].total;
        baja += result[dependency_id].baja_number;
        active += result[dependency_id].active_number;
        inactive += result[dependency_id].inactive_number;
        result[dependency_id] = {
          ...result[dependency_id],
          baja_number: baja,
          baja_percent: `${baja * (100 / total)}%`,
          active_number: active,
          active_percent: `${active * (100 / total)}%`,
          inactive_number: inactive,
          inactive_percent: `${inactive * (100 / total)}%`,
        };
      }
    });

    return result;
  };

  async generate(data: DomainGenerateReportDto): Promise<Buffer> {
    if (data.type === "bajas") {
      return await this.assetService.export({
        status: ["Dado de baja"],
      });
    }
    if (data.type === "contable") {
      const dataDB = await this.assetService.findAll();
      const newDataDB = this.generateContableData(dataDB);

      return this.filesService.generateExcel(
        Object.values(newDataDB),
        contableExcelHeaders
      );
    }
    return new Buffer("");
  }
}
