import { CompanyService } from 'src/company/domain/interfaces/company.service.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyServiceImpl } from '../../application/services/company.service';
import { CreateCompanyDto } from '../dto/company.create.dto';
import {
  companyCreateDataFake as registerCreateDataFake,
  companyDataFake as registerDataFake,
  companyUpdateDataFake as registerUpdateDataFake,
} from 'src/test/mock/company.sql.fake';
import { PasswordHelper } from 'src/auth/infrastructure/helpers/PasswordHelper';
import { FilesModule } from 'src/files/infrastructure/files.module';
import { MailModule } from 'src/email/infrastructure/email.module';
import { CoreModule } from 'src/shared/core.module';
import { ConfigModule } from '@nestjs/config';
import { EmailProvider } from 'src/shared/infrastructure/email/email.provider';
import { CompanyRepositoryImpl } from 'src/company/infrastructure/sql/repositories/company.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/company/infrastructure/sql/entities/company.entity';
import { Repository } from 'typeorm';
import { CompanyMapper } from '../mapper/company.mapper';

describe('CompaniesController', () => {
  let companiesController: CompanyController;
  let companiesService: CompanyService;
  let mapper: CompanyMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      imports: [
        CoreModule,
        ConfigModule,
        EmailProvider,
        FilesModule,
        MailModule,
      ],
      providers: [
        {
          provide: getRepositoryToken(CompanyEntity),
          useClass: Repository,
        },
        PasswordHelper,
        {
          provide: 'CompanyRepository',
          useClass: CompanyRepositoryImpl,
        },
        {
          provide: 'CompanyService',
          useClass: CompanyServiceImpl,
        },
      ],
    }).compile();
    mapper = new CompanyMapper();
    companiesController = module.get<CompanyController>(CompanyController);
    companiesService = module.get<CompanyService>('CompanyService');
  });

  describe('createCompany', () => {
    it('should return the created company', async () => {
      // Arrange
      const companyDto: CreateCompanyDto = registerCreateDataFake[0];
      const createdCompany = { id: 1, ...companyDto };
      jest.spyOn(companiesService, 'create').mockResolvedValue(createdCompany);

      // Act
      const result = await companiesController.create(companyDto);

      // Assert
      expect(result).toEqual({ ...createdCompany, password: undefined });
    });
  });

  describe('getCompany', () => {
    it('should return the requested company by ID', async () => {
      // Arrange
      const company = registerDataFake[0];
      jest.spyOn(companiesService, 'findById').mockResolvedValue(company);

      // Act
      const result = await companiesController.findById(company.id);
      // Assert
      expect(result).toEqual(mapper.toDto(company));
    });
    it('should return paginated', async () => {
      // Arrange
      jest.spyOn(companiesService, 'findPaginated').mockResolvedValue({
        total: registerDataFake.length,
        data: registerDataFake,
      });

      // Act
      const result = await companiesController.findPaginated({
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

  describe('updateCompany', () => {
    it('should return the updated company', async () => {
      // Arrange
      const companyId = 1;
      const updatedCompanyDto = registerUpdateDataFake[0];
      const updatedCompany = registerDataFake[0];
      jest.spyOn(companiesService, 'update').mockResolvedValue(updatedCompany);

      // Act
      const result = await companiesController.update(companyId, updatedCompanyDto);

      // Assert
      expect(result).toEqual(mapper.toDto(updatedCompany));
    });
  });
});
