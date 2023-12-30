// Se ubica en infraestructura porque tiene bases de framework
import { Module, Provider } from "@nestjs/common";
import { FilesServiceImp } from "../application/services/files.service";
import { FilesRepositoryImpl } from "./repositories/files.repository";

const providers: Provider[] = [
  {
    provide: "FilesService",
    useClass: FilesServiceImp,
  },
  {
    provide: "FilesRepository",
    useClass: FilesRepositoryImpl,
  },
];

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: "FilesService",
      useClass: FilesServiceImp,
    },
    {
      provide: "FilesRepository",
      useClass: FilesRepositoryImpl,
    },
  ],
  exports: providers,
})
export class FilesModule {}
