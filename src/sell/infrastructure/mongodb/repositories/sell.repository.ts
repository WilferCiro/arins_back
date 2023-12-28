// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Infraestructure

// Application

// Domain
import { Sell } from '../../../domain/entities/sell.type';
import { SellRepository } from '../../../domain/interfaces/sell.repository.interface';
import { DomainCreateSellDto } from 'src/sell/domain/dto/sell.create.dto';
import { DomainUpdateSellDto } from 'src/sell/domain/dto/sell.update.dto';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

@Injectable()
export class SellRepositoryImpl implements SellRepository {
  constructor(@InjectModel('Sell') private readonly model: Model<Sell>) {}

  async findAll(): Promise<Sell[]> {
    const sells = await this.model.find().lean();
    return sells;
  }

  async findById(id: number): Promise<Sell> {
    const register = await this.model.findById(id).lean();
    return register;
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Sell>> {
    const filters = {
      name: { $regex: pagination.search, $options: 'i' },
    };
    const total = await this.model.find(filters).countDocuments();
    const data = await this.model
      .find(filters)
      .skip(pagination.page * pagination.count)
      .limit(pagination.count);
    return { total, data };
  }

  async create(sell: DomainCreateSellDto): Promise<Sell> {
    const created = new this.model(sell);
    return await created.save();
  }

  async update(id: number, sell: DomainUpdateSellDto): Promise<Sell> {
    return await this.model.findByIdAndUpdate(id, sell, { new: true }).exec();
  }
}
