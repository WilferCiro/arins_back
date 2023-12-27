import { Module } from "@nestjs/common";
import { CoreModule } from "./shared/core.module";
import { MongodbProvider } from "./shared/infrastructure/database/mongodb/mongodb.provider";
import { EmailProvider } from "./shared/infrastructure/email/email.provider";
import { HttpModule } from "@nestjs/axios";
import { RequestContextModule } from "./modules/context/infraestructure/context.module";
import { AssetsModule } from "./asset/infrastructure/asset.module";
import { CompaniesModule } from "./company/infrastructure/company.module";
import { DependenciesModule } from "./dependency/infrastructure/dependency.module";
import { UsersModule } from "./user/infrastructure/user.module";
import { ProductsModule } from "./product/infrastructure/product.module";
import { StoresModule } from "./store/infrastructure/store.module";
import { AuthModule } from "./auth/infrastructure/auth.module";

@Module({
  imports: [
    RequestContextModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CoreModule,
    AuthModule,
    EmailProvider,
    MongodbProvider,
    AssetsModule,
    CompaniesModule,
    DependenciesModule,
    ProductsModule,
    StoresModule,
    UsersModule,
  ],
})
export class AppModule {}
