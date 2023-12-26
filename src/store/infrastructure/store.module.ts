// Se ubica en infraestructura porque tiene intereacción con la base de datos
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
})
export class StoresModule {}
