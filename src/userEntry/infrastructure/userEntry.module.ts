// Se ubica en infraestructura porque tiene bases de framework
import { Module, Provider } from "@nestjs/common";
import { UserEntryController } from "./controllers/userEntry.controller";
import { UserEntryServiceImpl } from "../application/services/userEntry.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserEntrySchema } from "./mongodb/schemas/userEntry.schema";
import { UserEntryRepositoryImpl } from "./mongodb/repositories/userEntry.repository";
import { PasswordHelper } from "src/shared/infrastructure/helpers/PasswordHelper";

const providers: Provider[] = [
  {
    provide: "UserEntryRepository",
    useClass: UserEntryRepositoryImpl,
  },
  {
    provide: "UserEntryService",
    useClass: UserEntryServiceImpl,
  },
];

@Module({
  imports: [MongooseModule.forFeature([{ name: "UserEntry", schema: UserEntrySchema }])],
  controllers: [UserEntryController],
  providers: [PasswordHelper, ...providers],
  exports: [...providers],
})
export class UserEntrysModule {}
