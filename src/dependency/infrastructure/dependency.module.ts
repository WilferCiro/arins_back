// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from "@nestjs/common";
import { DependencyController } from "./controllers/dependency.controller";
import { DependencyServiceImpl } from "../application/services/dependency.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DependencySchema } from "./mongodb/schemas/dependency.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { DependencyRepositoryImpl } from "./mongodb/repositories/dependency.repository";

const providers: Provider[] = [
  {
    provide: "DependencyRepository",
    useClass: DependencyRepositoryImpl,
  },
  {
    provide: "DependencyService",
    useClass: DependencyServiceImpl,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Dependency", schema: DependencySchema },
    ]),
  ],
  controllers: [DependencyController],
  providers: providers,
})
export class DependenciesModule {}
