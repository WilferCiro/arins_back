import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RequestContextModule } from "src/modules/context/infraestructure/context.module";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
  ],
  exports: [],
})
export class CoreModule {}
