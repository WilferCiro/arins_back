import { SellService } from "src/sell/domain/interfaces/sell.service.interface";
import { Test, TestingModule } from "@nestjs/testing";
import { SellController } from "./sell.controller";
import { SellServiceImpl } from "../services/sell.service";
import { CreateSellDto } from "../dto/sell.create.dto";
import {
  sellCreateDataFake as registerCreateDataFake,
  sellDataFake as registerDataFake,
  sellUpdateDataFake as registerUpdateDataFake,
} from "src/test/mock/sell.sql.fake";
import { PasswordHelper } from "src/auth/infrastructure/helpers/PasswordHelper";
import { FilesModule } from "src/files/infrastructure/files.module";
import { MailModule } from "src/email/infrastructure/email.module";
import { CoreModule } from "src/shared/core.module";
import { ConfigModule } from "@nestjs/config";
import { EmailProvider } from "src/shared/infrastructure/email/email.provider";
import { SellRepositoryImpl } from "src/sell/infrastructure/sql/repositories/sell.repository";
import { getRepositoryToken } from "@nestjs/typeorm";
import { SellEntity } from "src/sell/infrastructure/sql/entities/sell.entity";
import { Repository } from "typeorm";
import { SellMapper } from "../mapper/sell.mapper";

describe("SellsController", () => {
  let sellsController: SellController;
  let sellsService: SellService;
  let mapper: SellMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellController],
      imports: [
        CoreModule,
        ConfigModule,
        EmailProvider,
        FilesModule,
        MailModule,
      ],
      providers: [
        {
          provide: getRepositoryToken(SellEntity),
          useClass: Repository,
        },
        PasswordHelper,
        {
          provide: "SellRepository",
          useClass: SellRepositoryImpl,
        },
        {
          provide: "SellService",
          useClass: SellServiceImpl,
        },
      ],
    }).compile();
    mapper = new SellMapper();
    sellsController = module.get<SellController>(SellController);
    sellsService = module.get<SellService>("SellService");
  });

  describe("createSell", () => {
    it("should return the created sell", async () => {
      // Arrange
      const sellDto: CreateSellDto = registerCreateDataFake[0];
      const createdSell = { id: 1, ...sellDto };
      jest.spyOn(sellsService, "create").mockResolvedValue(createdSell);

      // Act
      const result = await sellsController.create(sellDto);

      // Assert
      expect(result).toEqual({ ...createdSell, password: undefined });
    });
  });

  describe("getSell", () => {
    it("should return the requested sell by ID", async () => {
      // Arrange
      const sell = registerDataFake[0];
      jest.spyOn(sellsService, "findById").mockResolvedValue(sell);

      // Act
      const result = await sellsController.findById(sell.id);
      // Assert
      expect(result).toEqual(mapper.toDto(sell));
    });
    it("should return paginated", async () => {
      // Arrange
      jest.spyOn(sellsService, "findPaginated").mockResolvedValue({
        total: registerDataFake.length,
        data: registerDataFake,
      });

      // Act
      const result = await sellsController.findPaginated({
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

  describe("updateSell", () => {
    it("should return the updated sell", async () => {
      // Arrange
      const sellId = 1;
      const updatedSellDto = registerUpdateDataFake[0];
      const updatedSell = registerDataFake[0];
      jest.spyOn(sellsService, "update").mockResolvedValue(updatedSell);

      // Act
      const result = await sellsController.update(sellId, updatedSellDto);

      // Assert
      expect(result).toEqual(mapper.toDto(updatedSell));
    });
  });
});
