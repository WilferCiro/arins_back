import { InventoryReportService } from "src/inventoryReport/domain/interfaces/inventoryReport.service.interface";
import { Test, TestingModule } from "@nestjs/testing";
import { InventoryReportController } from "./inventoryReport.controller";
import { InventoryReportServiceImpl } from "../../application/services/inventoryReport.service";
import { CreateInventoryReportDto } from "../dto/inventoryReport.generate.dto";
import {
  inventoryReportCreateDataFake as registerCreateDataFake,
  inventoryReportDataFake as registerDataFake,
  inventoryReportUpdateDataFake as registerUpdateDataFake,
} from "src/test/mock/inventoryReport.sql.fake";
import { PasswordHelper } from "src/auth/infrastructure/helpers/PasswordHelper";
import { FilesModule } from "src/files/infrastructure/files.module";
import { MailModule } from "src/email/infrastructure/email.module";
import { CoreModule } from "src/shared/core.module";
import { ConfigModule } from "@nestjs/config";
import { EmailProvider } from "src/shared/infrastructure/email/email.provider";
import { InventoryReportRepositoryImpl } from "src/inventoryReport/infrastructure/sql/repositories/inventoryReport.repository";
import { getRepositoryToken } from "@nestjs/typeorm";
import { InventoryReportEntity } from "src/inventoryReport/infrastructure/sql/entities/inventoryReport.entity";
import { Repository } from "typeorm";
import { InventoryReportMapper } from "../mapper/inventoryReport.mapper";

describe("InventoryReportsController", () => {
  let inventoryReportsController: InventoryReportController;
  let inventoryReportsService: InventoryReportService;
  let mapper: InventoryReportMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryReportController],
      imports: [
        CoreModule,
        ConfigModule,
        EmailProvider,
        FilesModule,
        MailModule,
      ],
      providers: [
        {
          provide: getRepositoryToken(InventoryReportEntity),
          useClass: Repository,
        },
        PasswordHelper,
        {
          provide: "InventoryReportRepository",
          useClass: InventoryReportRepositoryImpl,
        },
        {
          provide: "InventoryReportService",
          useClass: InventoryReportServiceImpl,
        },
      ],
    }).compile();
    mapper = new InventoryReportMapper();
    inventoryReportsController = module.get<InventoryReportController>(
      InventoryReportController
    );
    inventoryReportsService = module.get<InventoryReportService>(
      "InventoryReportService"
    );
  });

  describe("createInventoryReport", () => {
    it("should return the created inventoryReport", async () => {
      // Arrange
      const inventoryReportDto: CreateInventoryReportDto =
        registerCreateDataFake[0];
      const createdInventoryReport = { id: 1, ...inventoryReportDto };
      jest
        .spyOn(inventoryReportsService, "create")
        .mockResolvedValue(createdInventoryReport);

      // Act
      const result =
        await inventoryReportsController.create(inventoryReportDto);

      // Assert
      expect(result).toEqual({
        ...createdInventoryReport,
        password: undefined,
      });
    });
  });

  describe("getInventoryReport", () => {
    it("should return the requested inventoryReport by ID", async () => {
      // Arrange
      const inventoryReport = registerDataFake[0];
      jest
        .spyOn(inventoryReportsService, "findById")
        .mockResolvedValue(inventoryReport);

      // Act
      const result = await inventoryReportsController.findById(
        inventoryReport.id
      );
      // Assert
      expect(result).toEqual(mapper.toDto(inventoryReport));
    });
    it("should return paginated", async () => {
      // Arrange
      jest.spyOn(inventoryReportsService, "findPaginated").mockResolvedValue({
        total: registerDataFake.length,
        data: registerDataFake,
      });

      // Act
      const result = await inventoryReportsController.findPaginated({
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

  describe("updateInventoryReport", () => {
    it("should return the updated inventoryReport", async () => {
      // Arrange
      const inventoryReportId = 1;
      const updatedInventoryReportDto = registerUpdateDataFake[0];
      const updatedInventoryReport = registerDataFake[0];
      jest
        .spyOn(inventoryReportsService, "update")
        .mockResolvedValue(updatedInventoryReport);

      // Act
      const result = await inventoryReportsController.update(
        inventoryReportId,
        updatedInventoryReportDto
      );

      // Assert
      expect(result).toEqual(mapper.toDto(updatedInventoryReport));
    });
  });
});
