// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from "@nestjs/common";
import { InventoryReportController } from "./controllers/inventoryReport.controller";
import { InventoryReportServiceImpl } from "../application/services/inventoryReport.service";
import { FilesModule } from "src/modules/files/infrastructure/files.module";
import { AssetsModule } from "src/asset/infrastructure/asset.module";

const providers: Provider[] = [
  {
    provide: "InventoryReportService",
    useClass: InventoryReportServiceImpl,
  },
];

@Module({
  imports: [FilesModule, AssetsModule],
  controllers: [InventoryReportController],
  providers: providers,
})
export class InventoryReportsModule {}
