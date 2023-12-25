import { DependencyService } from "src/dependency/domain/interfaces/dependency.service.interface";
import { Test, TestingModule } from "@nestjs/testing";
import { DependencyServiceImpl } from "../services/dependency.service";
import { CreateDependencyDto } from "../../infrastructure/dto/dependency.create.dto";
import {
  dependencyCreateDataFake as registerCreateDataFake,
  dependencyDataFake as registerDataFake,
  dependencyUpdateDataFake as registerUpdateDataFake,
} from "src/test/mock/dependency.sql.fake";
import { PasswordHelper } from "src/auth/infrastructure/helpers/PasswordHelper";
import { FilesModule } from "src/files/infrastructure/files.module";
import { MailModule } from "src/email/infrastructure/email.module";
import { CoreModule } from "src/shared/core.module";
import { ConfigModule } from "@nestjs/config";
import { EmailProvider } from "src/shared/infrastructure/email/email.provider";
import { DependencyRepositoryImpl } from "src/dependency/infrastructure/sql/repositories/dependency.repository";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DependencyEntity } from "src/dependency/infrastructure/sql/entities/dependency.entity";
import { Repository } from "typeorm";
import { DependencyRepository } from "src/dependency/domain/interfaces/dependency.repository.interface";

describe("DependenciesController", () => {
  let dependenciesService: DependencyService;
  let dependenciesRepository: DependencyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CoreModule,
        ConfigModule,
        EmailProvider,
        FilesModule,
        MailModule,
      ],
      providers: [
        {
          provide: getRepositoryToken(DependencyEntity),
          useClass: Repository,
        },
        PasswordHelper,
        {
          provide: "DependencyRepository",
          useClass: DependencyRepositoryImpl,
        },
        {
          provide: "DependencyService",
          useClass: DependencyServiceImpl,
        },
      ],
    }).compile();

    dependenciesRepository = module.get<DependencyRepository>(
      "DependencyRepository"
    );
    dependenciesService = module.get<DependencyService>("DependencyService");
  });

  describe("createDependency", () => {
    it("should return the created dependency", async () => {
      // Arrange
      const dependencyDto: CreateDependencyDto = registerCreateDataFake[0];
      const createdDependency = { id: 1, ...dependencyDto };
      jest
        .spyOn(dependenciesRepository, "create")
        .mockResolvedValue({ ...createdDependency, password: undefined });

      // Act
      const result = await dependenciesService.create(dependencyDto, false);

      // Assert
      expect(result).toEqual({ ...createdDependency, password: undefined });
    });
  });

  describe("getDependency", () => {
    it("should return the requested dependency by ID", async () => {
      // Arrange
      const dependency = registerDataFake[0];
      jest
        .spyOn(dependenciesRepository, "findById")
        .mockResolvedValue(dependency);

      // Act
      const result = await dependenciesService.findById(dependency.id);

      // Assert
      expect(result).toEqual(dependency);
    });
    it("should return paginated", async () => {
      // Arrange
      jest.spyOn(dependenciesRepository, "findPaginated").mockResolvedValue({
        total: registerDataFake.length,
        data: registerDataFake,
      });

      // Act
      const result = await dependenciesService.findPaginated({
        page: 0,
        count: 10,
        sort: "",
        sortOrder: 1,
        search: "",
      });

      // Assert
      expect(result).toEqual({
        total: registerDataFake.length,
        data: registerDataFake,
      });
    });
  });

  describe("updateDependency", () => {
    it("should return the updated dependency", async () => {
      // Arrange
      const dependencyId = 1;
      const updatedDependencyDto = registerUpdateDataFake[0];
      const updatedDependency = registerDataFake[0];
      jest
        .spyOn(dependenciesRepository, "update")
        .mockResolvedValue(updatedDependency);

      // Act
      const result = await dependenciesService.update(
        dependencyId,
        updatedDependencyDto
      );

      // Assert
      expect(result).toEqual(updatedDependency);
    });
  });
});
