// Se ubica en infraestructura porque tiene bases de framework
import { Module, Provider } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { UserServiceImpl } from "../application/services/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./mongodb/schemas/user.schema";
import { UserRepositoryImpl } from "./mongodb/repositories/user.repository";
import { PasswordHelper } from "src/shared/infrastructure/helpers/PasswordHelper";

const providers: Provider[] = [
  {
    provide: "UserRepository",
    useClass: UserRepositoryImpl,
  },
  {
    provide: "UserService",
    useClass: UserServiceImpl,
  },
];

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  controllers: [UserController],
  providers: [PasswordHelper, ...providers],
  exports: [...providers],
})
export class UsersModule {}
