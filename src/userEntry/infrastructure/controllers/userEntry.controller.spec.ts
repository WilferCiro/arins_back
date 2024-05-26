import { UserEntryService } from 'src/userEntry/domain/interfaces/userEntry.service.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntryController } from './userEntry.controller';
import { UserEntryServiceImpl } from '../services/userEntry.service';
import { CreateUserEntryDto } from '../dto/userEntry.create.dto';
import {
  userEntryCreateDataFake as registerCreateDataFake,
  userEntryDataFake as registerDataFake,
  userEntryUpdateDataFake as registerUpdateDataFake,
} from 'src/test/mock/userEntry.sql.fake';
import { PasswordHelper } from 'src/auth/infrastructure/helpers/PasswordHelper';
import { FilesModule } from 'src/files/infrastructure/files.module';
import { MailModule } from 'src/email/infrastructure/email.module';
import { CoreModule } from 'src/shared/core.module';
import { ConfigModule } from '@nestjs/config';
import { EmailProvider } from 'src/shared/infrastructure/email/email.provider';
import { UserEntryRepositoryImpl } from 'src/userEntry/infrastructure/sql/repositories/userEntry.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntryEntity } from 'src/userEntry/infrastructure/sql/entities/userEntry.entity';
import { Repository } from 'typeorm';
import { UserEntryMapper } from '../mapper/userEntry.mapper';

describe('UserEntrysController', () => {
  let UserEntriesController: UserEntryController;
  let UserEntriesService: UserEntryService;
  let mapper: UserEntryMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEntryController],
      imports: [
        CoreModule,
        ConfigModule,
        EmailProvider,
        FilesModule,
        MailModule,
      ],
      providers: [
        {
          provide: getRepositoryToken(UserEntryEntity),
          useClass: Repository,
        },
        PasswordHelper,
        {
          provide: 'UserEntryRepository',
          useClass: UserEntryRepositoryImpl,
        },
        {
          provide: 'UserEntryService',
          useClass: UserEntryServiceImpl,
        },
      ],
    }).compile();
    mapper = new UserEntryMapper();
    UserEntriesController = module.get<UserEntryController>(UserEntryController);
    UserEntriesService = module.get<UserEntryService>('UserEntryService');
  });

  describe('createUserEntry', () => {
    it('should return the created userEntry', async () => {
      // Arrange
      const userEntryDto: CreateUserEntryDto = registerCreateDataFake[0];
      const createdUserEntry = { id: 1, ...userEntryDto };
      jest.spyOn(UserEntriesService, 'create').mockResolvedValue(createdUserEntry);

      // Act
      const result = await UserEntriesController.create(userEntryDto);

      // Assert
      expect(result).toEqual({ ...createdUserEntry, password: undefined });
    });
  });

  describe('getUserEntry', () => {
    it('should return the requested userEntry by ID', async () => {
      // Arrange
      const userEntry = registerDataFake[0];
      jest.spyOn(UserEntriesService, 'findById').mockResolvedValue(userEntry);

      // Act
      const result = await UserEntriesController.findById(userEntry.id);
      // Assert
      expect(result).toEqual(mapper.toDto(userEntry));
    });
    it('should return paginated', async () => {
      // Arrange
      jest.spyOn(UserEntriesService, 'findPaginated').mockResolvedValue({
        total: registerDataFake.length,
        data: registerDataFake,
      });

      // Act
      const result = await UserEntriesController.findPaginated({
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

  describe('updateUserEntry', () => {
    it('should return the updated userEntry', async () => {
      // Arrange
      const userEntryId = 1;
      const updatedUserEntryDto = registerUpdateDataFake[0];
      const updatedUserEntry = registerDataFake[0];
      jest.spyOn(UserEntriesService, 'update').mockResolvedValue(updatedUserEntry);

      // Act
      const result = await UserEntriesController.update(userEntryId, updatedUserEntryDto);

      // Assert
      expect(result).toEqual(mapper.toDto(updatedUserEntry));
    });
  });
});
