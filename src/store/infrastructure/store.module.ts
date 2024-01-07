// Se ubica en infraestructura porque tiene bases de framework
import { Module, Provider } from "@nestjs/common";
import { StoreController } from "./controllers/store.controller";
import { StoreServiceImpl } from "../application/services/store.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StoreSchema } from "./mongodb/schemas/store.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { StoreRepositoryImpl } from "./mongodb/repositories/store.repository";

const providers: Provider[] = [
  {
    provide: "StoreRepository",
    useClass: StoreRepositoryImpl,
  },
  {
    provide: "StoreService",
    useClass: StoreServiceImpl,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Store", schema: StoreSchema }]),
  ],
  controllers: [StoreController],
  providers: providers,
  exports: providers,
})
export class StoresModule {}
