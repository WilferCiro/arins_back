import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { RequestContextModule } from "src/modules/context/infraestructure/context.module";
import { UsersModule } from "src/user/infrastructure/user.module";

@Global()
@Module({
  imports: [
    UsersModule,
    RequestContextModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("SECRET_JWT"),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
  ],
  exports: [JwtModule, ConfigModule, RequestContextModule, UsersModule],
})
export class CoreModule {}
