import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

// Sell specific
import { SellRepositoryImpl } from './sell.repository';
import { SellEntity } from '../entities/sell.entity';
import { sellDataFake as registerDataFake } from 'src/test/mock/sell.sql.fake';

describe('SellRepository', () => {
  let repository: SellRepositoryImpl;
  let repositoryToken: string;
  let repositoryMock: Repository<SellEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SellRepositoryImpl,
        {
          provide: getRepositoryToken(SellEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<SellRepositoryImpl>(SellRepositoryImpl);
    repositoryToken = getRepositoryToken(SellEntity) as string;
    repositoryMock = module.get<Repository<SellEntity>>(repositoryToken);
  });

  describe('createSell', () => {
    it('should create a new register', async () => {
      const newSell: SellEntity = registerDataFake[0];
      const saveSpy = jest
        .spyOn(repositoryMock, 'save')
        .mockResolvedValue(newSell);

      const result = await repository.create(newSell);

      expect(saveSpy).toHaveBeenCalledWith(newSell);
      expect(result).toEqual(newSell);
    });
  });

  describe('updateSell', () => {
    it('should update a register', async () => {
      const register: SellEntity = registerDataFake[0];
      const register2: SellEntity = registerDataFake[1];
      const saveSpy = jest
        .spyOn(repositoryMock, 'save')
        .mockResolvedValue(register2);
      const findSpy = jest
        .spyOn(repositoryMock, 'findOneBy')
        .mockResolvedValue(register);

      const result = await repository.update(register.id, register2);

      expect(findSpy).toHaveBeenCalledWith({ id: register.id });
      expect(saveSpy).toHaveBeenCalledWith({ id: register.id, ...register2 });
      expect(result).toEqual(register2);
    });
    it('should not update a register', async () => {
      const register: SellEntity = registerDataFake[0];
      jest.spyOn(repositoryMock, 'findOneBy').mockResolvedValue(undefined);

      await expect(repository.update(register.id, register)).rejects.toThrow(
        new BadRequestException(`El REGISTRO no está registrado`),
      );
    });
  });

  describe('getSell', () => {
    it('should findAll registers', async () => {
      const registers: SellEntity[] = registerDataFake;
      const findSpy = jest
        .spyOn(repositoryMock, 'findBy')
        .mockResolvedValue(registers);

      const result = await repository.findAll();

      expect(findSpy).toHaveBeenCalledWith({ active: true });
      expect(result).toEqual(registers);
    });
    it('should find by ID', async () => {
      const register: SellEntity = registerDataFake[0];
      const findSpy = jest
        .spyOn(repositoryMock, 'findOneBy')
        .mockResolvedValue(register);

      const result = await repository.findById(register.id);
      expect(findSpy).toHaveBeenCalledWith({ id: register.id });
      expect(result).toEqual(register);
    });
    it('should find paginated', async () => {
      const registers: SellEntity[] = registerDataFake;
      jest
        .spyOn(repositoryMock, 'findAndCount')
        .mockResolvedValue([registers, registers.length]);

      const result = await repository.findPaginated({
        page: 0,
        count: 10,
        sort: '',
        sortOrder: 1,
      });
      expect(result).toEqual({ total: registers.length, data: registers });
    });
  });
});
