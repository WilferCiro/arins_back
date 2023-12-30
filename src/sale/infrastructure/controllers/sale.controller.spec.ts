import { SaleService } from 'src/sale/domain/interfaces/sale.service.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { SaleController } from './sale.controller';
import { SaleServiceImpl } from '../services/sale.service';
import { CreateSaleDto } from '../dto/sale.create.dto';
import {
  saleCreateDataFake as registerCreateDataFake,
  saleDataFake as registerDataFake,
  saleUpdateDataFake as registerUpdateDataFake,
} from 'src/test/mock/sale.sql.fake';
import { PasswordHelper } from 'src/auth/infrastructure/helpers/PasswordHelper';
import { FilesModule } from 'src/files/infrastructure/files.module';
import { MailModule } from 'src/email/infrastructure/email.module';
import { CoreModule } from 'src/shared/core.module';
import { ConfigModule } from '@nestjs/config';
import { EmailProvider } from 'src/shared/infrastructure/email/email.provider';
import { SaleRepositoryImpl } from 'src/sale/infrastructure/sql/repositories/sale.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SaleEntity } from 'src/sale/infrastructure/sql/entities/sale.entity';
import { Repository } from 'typeorm';
import { SaleMapper } from '../mapper/sale.mapper';

describe('SalesController', () => {
  let salesController: SaleController;
  let salesService: SaleService;
  let mapper: SaleMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleController],
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
          provide: 'SaleRepository',
          useClass: SaleRepositoryImpl,
        },
        {
          provide: 'SaleService',
          useClass: SaleServiceImpl,
        },
      ],
    }).compile();
    mapper = new SaleMapper();
    salesController = module.get<SaleController>(SaleController);
    salesService = module.get<SaleService>('SaleService');
  });

  describe('createSale', () => {
    it('should return the created sale', async () => {
      // Arrange
      const saleDto: CreateSaleDto = registerCreateDataFake[0];
      const createdSale = { id: 1, ...saleDto };
      jest.spyOn(salesService, 'create').mockResolvedValue(createdSale);

      // Act
      const result = await salesController.create(saleDto);

      // Assert
      expect(result).toEqual({ ...createdSale, password: undefined });
    });
  });

  describe('getSale', () => {
    it('should return the requested sale by ID', async () => {
      // Arrange
      const sale = registerDataFake[0];
      jest.spyOn(salesService, 'findById').mockResolvedValue(sale);

      // Act
      const result = await salesController.findById(sale.id);
      // Assert
      expect(result).toEqual(mapper.toDto(sale));
    });
    it('should return paginated', async () => {
      // Arrange
      jest.spyOn(salesService, 'findPaginated').mockResolvedValue({
        total: registerDataFake.length,
        data: registerDataFake,
      });

      // Act
      const result = await salesController.findPaginated({
        page: 0,
        count: 10,
        sort: '',
        sortOrder: 1,
        search: '',
      });

      // Assert
      expect(result).toEqual({
        total: registerDataFake.length,
        data: registerDataFake.map((r) => mapper.toDto(r)),
      });
    });
  });

  describe('updateSale', () => {
    it('should return the updated sale', async () => {
      // Arrange
      const saleId = 1;
      const updatedSaleDto = registerUpdateDataFake[0];
      const updatedSale = registerDataFake[0];
      jest.spyOn(salesService, 'update').mockResolvedValue(updatedSale);

      // Act
      const result = await salesController.update(saleId, updatedSaleDto);

      // Assert
      expect(result).toEqual(mapper.toDto(updatedSale));
    });
  });
});
