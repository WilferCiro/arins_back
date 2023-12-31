import { AssetService } from "src/asset/domain/interfaces/asset.service.interface";
import { Test, TestingModule } from "@nestjs/testing";
import { AssetController } from "./asset.controller";
import { AssetServiceImpl } from "../../application/services/asset.service";
import { CreateAssetDto } from "../dto/asset.create.dto";
import {
  assetCreateDataFake as registerCreateDataFake,
  assetDataFake as registerDataFake,
  assetUpdateDataFake as registerUpdateDataFake,
} from "src/test/mock/asset.sql.fake";
import { PasswordHelper } from "src/auth/infrastructure/helpers/PasswordHelper";
import { FilesModule } from "src/files/infrastructure/files.module";
import { MailModule } from "src/email/infrastructure/email.module";
import { CoreModule } from "src/shared/core.module";
import { ConfigModule } from "@nestjs/config";
import { EmailProvider } from "src/shared/infrastructure/email/email.provider";
import { AssetRepositoryImpl } from "src/asset/infrastructure/sql/repositories/asset.repository";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AssetEntity } from "src/asset/infrastructure/sql/entities/asset.entity";
import { Repository } from "typeorm";
import { AssetMapper } from "../mapper/asset.mapper";

describe("AssetsController", () => {
  let assetsController: AssetController;
  let assetsService: AssetService;
  let mapper: AssetMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetController],
      imports: [
        CoreModule,
        ConfigModule,
        EmailProvider,
        FilesModule,
        MailModule,
      ],
      providers: [
        {
          provide: getRepositoryToken(AssetEntity),
          useClass: Repository,
        },
        PasswordHelper,
        {
          provide: "AssetRepository",
          useClass: AssetRepositoryImpl,
        },
        {
          provide: "AssetService",
          useClass: AssetServiceImpl,
        },
      ],
    }).compile();
    mapper = new AssetMapper();
    assetsController = module.get<AssetController>(AssetController);
    assetsService = module.get<AssetService>("AssetService");
  });

  describe("createAsset", () => {
    it("should return the created asset", async () => {
      // Arrange
      const assetDto: CreateAssetDto = registerCreateDataFake[0];
      const createdAsset = { id: 1, ...assetDto };
      jest.spyOn(assetsService, "create").mockResolvedValue(createdAsset);

      // Act
      const result = await assetsController.create(assetDto);

      // Assert
      expect(result).toEqual({ ...createdAsset, password: undefined });
    });
  });

  describe("getAsset", () => {
    it("should return the requested asset by ID", async () => {
      // Arrange
      const asset = registerDataFake[0];
      jest.spyOn(assetsService, "findById").mockResolvedValue(asset);

      // Act
      const result = await assetsController.findById(asset.id);
      // Assert
      expect(result).toEqual(mapper.toDto(asset));
    });
    it("should return paginated", async () => {
      // Arrange
      jest.spyOn(assetsService, "findPaginated").mockResolvedValue({
        total: registerDataFake.length,
        data: registerDataFake,
      });

      // Act
      const result = await assetsController.findPaginated({
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

  describe("updateAsset", () => {
    it("should return the updated asset", async () => {
      // Arrange
      const assetId = 1;
      const updatedAssetDto = registerUpdateDataFake[0];
      const updatedAsset = registerDataFake[0];
      jest.spyOn(assetsService, "update").mockResolvedValue(updatedAsset);

      // Act
      const result = await assetsController.update(assetId, updatedAssetDto);

      // Assert
      expect(result).toEqual(mapper.toDto(updatedAsset));
    });
  });
});
