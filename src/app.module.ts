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
import { SalesModule } from "./sale/infrastructure/sale.module";
import { InventoryReportsModule } from "./inventoryReport/infrastructure/inventoryReport.module";
import { UserEntrysModule } from "./userEntry/infrastructure/userEntry.module";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CoreModule,
    EmailProvider,
    MongodbProvider,
    UsersModule,
    AssetsModule,
    CompaniesModule,
    DependenciesModule,
    ProductsModule,
    StoresModule,
    AuthModule,
    SalesModule,
    UserEntrysModule,
    InventoryReportsModule,
  ],
})
export class AppModule {}
