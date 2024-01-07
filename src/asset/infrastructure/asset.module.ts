// Se ubica en infraestructura porque tiene bases de framework
import { Module, Provider } from "@nestjs/common";
import { AssetController } from "./controllers/asset.controller";
import { AssetServiceImpl } from "../application/services/asset.service";
import { AssetSchema } from "./mongodb/schemas/asset.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { AssetRepositoryImpl } from "./mongodb/repositories/asset.repository";
import { FilesModule } from "src/modules/files/infrastructure/files.module";

const providers: Provider[] = [
  {
    provide: "AssetRepository",
    useClass: AssetRepositoryImpl,
  },
  {
    provide: "AssetService",
    useClass: AssetServiceImpl,
  },
];

@Module({
  imports: [
    FilesModule,
    MongooseModule.forFeature([{ name: "Asset", schema: AssetSchema }]),
  ],
  controllers: [AssetController],
  providers: providers,
  exports: providers,
})
export class AssetsModule {}
