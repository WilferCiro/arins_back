// Se ubica en infraestructura porque tiene bases de framework
import { Module, Provider } from "@nestjs/common";
import { ProductController } from "./controllers/product.controller";
import { ProductServiceImpl } from "../application/services/product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductSchema } from "./mongodb/schemas/product.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductRepositoryImpl } from "./mongodb/repositories/product.repository";
import { FilesModule } from "src/modules/files/infrastructure/files.module";

const providers: Provider[] = [
  {
    provide: "ProductRepository",
    useClass: ProductRepositoryImpl,
  },
  {
    provide: "ProductService",
    useClass: ProductServiceImpl,
  },
];

@Module({
  imports: [
    FilesModule,
    MongooseModule.forFeature([{ name: "Product", schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: providers,
  exports: [...providers],
})
export class ProductsModule {}
