// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from "@nestjs/common";
import { AssetController } from "./controllers/asset.controller";
import { AssetServiceImpl } from "../application/services/asset.service";
import { AssetSchema } from "./mongodb/schemas/asset.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { AssetRepositoryImpl } from "./mongodb/repositories/asset.repository";

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
    MongooseModule.forFeature([{ name: "Asset", schema: AssetSchema }]),
  ],
  controllers: [AssetController],
  providers: providers,
})
export class AssetsModule {}
