// Se ubica en infraestructura porque tiene bases de framework
import { Module, Provider } from "@nestjs/common";
import { MailRepositoryImpl } from "./repositories/email.repository";
import { MailServiceImp } from "../application/services/email.service";

const emailProviders: Provider[] = [
  {
    provide: "EmailService",
    useClass: MailServiceImp,
  },
  {
    provide: "EmailRepository",
    useClass: MailRepositoryImpl,
  },
];

@Module({
  imports: [],
  controllers: [],
  providers: [...emailProviders],
  exports: [...emailProviders],
})
export class MailModule {}
