// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from "@nestjs/common";
import { SellController } from "../infrastructure/controllers/sell.controller";
import { SellRepositoryImpl } from "./sql/repositories/sell.repository";
import { SellServiceImpl } from "../application/services/sell.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SellEntity } from "./sql/entities/sell.entity";

const providers: Provider[] = [
  {
    provide: "SellRepository",
    useClass: SellRepositoryImpl,
  },
  {
    provide: "SellService",
    useClass: SellServiceImpl,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([SellEntity])],
  controllers: [SellController],
  providers: providers,
})
export class SellsModule {}
