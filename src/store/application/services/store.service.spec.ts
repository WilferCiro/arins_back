import { StoreService } from "src/store/domain/interfaces/store.service.interface";
import { Test, TestingModule } from "@nestjs/testing";
import { StoreServiceImpl } from "../services/store.service";
import { CreateStoreDto } from "../../infrastructure/dto/store.create.dto";
import {
  storeCreateDataFake as registerCreateDataFake,
  storeDataFake as registerDataFake,
  storeUpdateDataFake as registerUpdateDataFake,
} from "src/test/mock/store.sql.fake";
import { PasswordHelper } from "src/auth/infrastructure/helpers/PasswordHelper";
import { FilesModule } from "src/files/infrastructure/files.module";
import { MailModule } from "src/email/infrastructure/email.module";
import { CoreModule } from "src/shared/core.module";
import { ConfigModule } from "@nestjs/config";
import { EmailProvider } from "src/shared/infrastructure/email/email.provider";
import { StoreRepositoryImpl } from "src/store/infrastructure/sql/repositories/store.repository";
import { getRepositoryToken } from "@nestjs/typeorm";
import { StoreEntity } from "src/store/infrastructure/sql/entities/store.entity";
import { Repository } from "typeorm";
import { StoreRepository } from "src/store/domain/interfaces/store.repository.interface";

describe("StoresController", () => {
  let storesService: StoreService;
  let storesRepository: StoreRepository;

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
          provide: getRepositoryToken(StoreEntity),
          useClass: Repository,
        },
        PasswordHelper,
        {
          provide: "StoreRepository",
          useClass: StoreRepositoryImpl,
        },
        {
          provide: "StoreService",
          useClass: StoreServiceImpl,
        },
      ],
    }).compile();

    storesRepository = module.get<StoreRepository>("StoreRepository");
    storesService = module.get<StoreService>("StoreService");
  });

  describe("createStore", () => {
    it("should return the created store", async () => {
      // Arrange
      const storeDto: CreateStoreDto = registerCreateDataFake[0];
      const createdStore = { id: 1, ...storeDto };
      jest
        .spyOn(storesRepository, "create")
        .mockResolvedValue({ ...createdStore, password: undefined });

      // Act
      const result = await storesService.create(storeDto, false);

      // Assert
      expect(result).toEqual({ ...createdStore, password: undefined });
    });
  });

  describe("getStore", () => {
    it("should return the requested store by ID", async () => {
      // Arrange
      const store = registerDataFake[0];
      jest.spyOn(storesRepository, "findById").mockResolvedValue(store);

      // Act
      const result = await storesService.findById(store.id);

      // Assert
      expect(result).toEqual(store);
    });
    it("should return paginated", async () => {
      // Arrange
      jest.spyOn(storesRepository, "findPaginated").mockResolvedValue({
        total: registerDataFake.length,
        data: registerDataFake,
      });

      // Act
      const result = await storesService.findPaginated({
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

  describe("updateStore", () => {
    it("should return the updated store", async () => {
      // Arrange
      const storeId = 1;
      const updatedStoreDto = registerUpdateDataFake[0];
      const updatedStore = registerDataFake[0];
      jest.spyOn(storesRepository, "update").mockResolvedValue(updatedStore);

      // Act
      const result = await storesService.update(storeId, updatedStoreDto);

      // Assert
      expect(result).toEqual(updatedStore);
    });
  });
});
