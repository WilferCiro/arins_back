import { BadRequestException, Injectable } from '@nestjs/common';
import { SellRepository } from '../../../domain/interfaces/sell.repository.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';
import { ILike, Repository } from 'typeorm';
import { SellEntity } from '../entities/sell.entity';
import { Sell } from 'src/sell/domain/entities/sell.type';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainUpdateSellDto } from 'src/sell/domain/dto/sell.update.dto';
import { DomainCreateSellDto } from 'src/sell/domain/dto/sell.create.dto';

@Injectable()
export class SellRepositoryImpl implements SellRepository {
  constructor(
    @InjectRepository(SellEntity)
    private readonly repository: Repository<SellEntity>,
  ) {}

  async findAll(): Promise<Sell[]> {
    return await this.repository.findBy({ active: true });
  }

  async findById(id: number): Promise<Sell> {
    return await this.repository.findOneBy({ id: +id });
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Sell>> {
    const filters = {
      where: [
        { name: ILike(`%${pagination.search}%`) },
      ],
    };
    const [data, total] = await this.repository.findAndCount({
      ...filters,
      skip: pagination.page * pagination.count,
      take: pagination.count,
    });
    return { total, data };
  }

  async create(sell: DomainCreateSellDto): Promise<Sell> {
    const exists = false; // TODO: check if exists
    if (exists) {
      throw new BadRequestException(
        `El registro ya existe`,
      );
    }
    return await this.repository.save(sell);
  }

  async update(id: number, sell: DomainUpdateSellDto): Promise<Sell> {
    return await this.repository.save({ id, ...sell });
  }
}
