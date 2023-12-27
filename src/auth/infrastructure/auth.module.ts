// Se ubica en infraestructura porque tiene intereacción con la base de datos
import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthServiceImpl } from "../application/services/auth.service";
import { UsersModule } from "src/user/infrastructure/user.module";
import { PasswordHelper } from "src/shared/infrastructure/helpers/PasswordHelper";

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    PasswordHelper,
    {
      provide: "AuthService",
      useClass: AuthServiceImpl,
    },
  ],
})
export class AuthModule {}
