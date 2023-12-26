import { StoreService } from "src/store/domain/interfaces/store.service.interface";
import { Test, TestingModule } from "@nestjs/testing";
import { StoreController } from "./store.controller";
import { StoreServiceImpl } from "../../application/services/store.service";
import { CreateStoreDto } from "../dto/store.create.dto";
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
import { StoreMapper } from "../mapper/store.mapper";

describe("StoresController", () => {
  let storesController: StoreController;
  let storesService: StoreService;
  let mapper: StoreMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
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
    mapper = new StoreMapper();
    storesController = module.get<StoreController>(StoreController);
    storesService = module.get<StoreService>("StoreService");
  });

  describe("createStore", () => {
    it("should return the created store", async () => {
      // Arrange
      const storeDto: CreateStoreDto = registerCreateDataFake[0];
      const createdStore = { id: 1, ...storeDto };
      jest.spyOn(storesService, "create").mockResolvedValue(createdStore);

      // Act
      const result = await storesController.create(storeDto);

      // Assert
      expect(result).toEqual({ ...createdStore, password: undefined });
    });
  });

  describe("getStore", () => {
    it("should return the requested store by ID", async () => {
      // Arrange
      const store = registerDataFake[0];
      jest.spyOn(storesService, "findById").mockResolvedValue(store);

      // Act
      const result = await storesController.findById(store.id);
      // Assert
      expect(result).toEqual(mapper.toDto(store));
    });
    it("should return paginated", async () => {
      // Arrange
      jest.spyOn(storesService, "findPaginated").mockResolvedValue({
        total: registerDataFake.length,
        data: registerDataFake,
      });

      // Act
      const result = await storesController.findPaginated({
        page: 0,
        count: 10,
        sort: "",
        sortOrder: 1,
        search: "",
      });

      // Assert
      expect(result).toEqual({
        total: registerDataFake.length,
        data: registerDataFake.map((r) => mapper.toDto(r)),
      });
    });
  });

  describe("updateStore", () => {
    it("should return the updated store", async () => {
      // Arrange
      const storeId = 1;
      const updatedStoreDto = registerUpdateDataFake[0];
      const updatedStore = registerDataFake[0];
      jest.spyOn(storesService, "update").mockResolvedValue(updatedStore);

      // Act
      const result = await storesController.update(storeId, updatedStoreDto);

      // Assert
      expect(result).toEqual(mapper.toDto(updatedStore));
    });
  });
});
