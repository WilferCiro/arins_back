// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module, Provider } from "@nestjs/common";
import { ProductController } from "../application/controllers/product.controller";
import { ProductServiceImpl } from "../application/services/product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductSchema } from "./mongodb/schemas/product.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductRepositoryImpl } from "./mongodb/repositories/product.repository";

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
    MongooseModule.forFeature([{ name: "Product", schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: providers,
})
export class ProductsModule {}
