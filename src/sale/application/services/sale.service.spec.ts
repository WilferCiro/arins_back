import { SaleService } from "src/sale/domain/interfaces/sale.service.interface";
import { Test, TestingModule } from "@nestjs/testing";
import { SaleServiceImpl } from "../services/sale.service";
import { CreateSaleDto } from "../../infrastructure/dto/sale.create.dto";
import {
  saleCreateDataFake as registerCreateDataFake,
  saleDataFake as registerDataFake,
  saleUpdateDataFake as registerUpdateDataFake,
} from "src/test/mock/sale.sql.fake";
import { PasswordHelper } from "src/auth/infrastructure/helpers/PasswordHelper";
import { FilesModule } from "src/files/infrastructure/files.module";
import { MailModule } from "src/email/infrastructure/email.module";
import { CoreModule } from "src/shared/core.module";
import { ConfigModule } from "@nestjs/config";
import { EmailProvider } from "src/shared/infrastructure/email/email.provider";
import { SaleRepositoryImpl } from "src/sale/infrastructure/sql/repositories/sale.repository";
import { getRepositoryToken } from "@nestjs/typeorm";
import { SaleEntity } from "src/sale/infrastructure/sql/entities/sale.entity";
import { Repository } from "typeorm";
import { SaleRepository } from "src/sale/domain/interfaces/sale.repository.interface";

describe("SalesController", () => {
  let salesService: SaleService;
  let salesRepository: SaleRepository;

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
          provide: getRepositoryToken(SaleEntity),
          useClass: Repository,
        },
        PasswordHelper,
        {
          provide: "SaleRepository",
          useClass: SaleRepositoryImpl,
        },
        {
          provide: "SaleService",
          useClass: SaleServiceImpl,
        },
      ],
    }).compile();

    salesRepository = module.get<SaleRepository>("SaleRepository");
    salesService = module.get<SaleService>("SaleService");
  });

  describe("createSale", () => {
    it("should return the created sale", async () => {
      // Arrange
      const saleDto: CreateSaleDto = registerCreateDataFake[0];
      const createdSale = { id: 1, ...saleDto };
      jest
        .spyOn(salesRepository, "create")
        .mockResolvedValue({ ...createdSale, password: undefined });

      // Act
      const result = await salesService.create(saleDto, false);

      // Assert
      expect(result).toEqual({ ...createdSale, password: undefined });
    });
  });

  describe("getSale", () => {
    it("should return the requested sale by ID", async () => {
      // Arrange
      const sale = registerDataFake[0];
      jest.spyOn(salesRepository, "findById").mockResolvedValue(sale);

      // Act
      const result = await salesService.findById(sale.id);

      // Assert
      expect(result).toEqual(sale);
    });
    it("should return paginated", async () => {
      // Arrange
      jest.spyOn(salesRepository, "findPaginated").mockResolvedValue({
        total: registerDataFake.length,
        data: registerDataFake,
      });

      // Act
      const result = await salesService.findPaginated({
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

  describe("updateSale", () => {
    it("should return the updated sale", async () => {
      // Arrange
      const saleId = 1;
      const updatedSaleDto = registerUpdateDataFake[0];
      const updatedSale = registerDataFake[0];
      jest.spyOn(salesRepository, "update").mockResolvedValue(updatedSale);

      // Act
      const result = await salesService.update(saleId, updatedSaleDto);

      // Assert
      expect(result).toEqual(updatedSale);
    });
  });
});
