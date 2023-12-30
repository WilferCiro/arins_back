// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Infraestructure

// Application

// Domain
import { Sale } from '../../../domain/entities/sale.type';
import { SaleRepository } from '../../../domain/interfaces/sale.repository.interface';
import { DomainCreateSaleDto } from 'src/sale/domain/dto/sale.create.dto';
import { DomainUpdateSaleDto } from 'src/sale/domain/dto/sale.update.dto';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

@Injectable()
export class SaleRepositoryImpl implements SaleRepository {
  constructor(@InjectModel('Sale') private readonly model: Model<Sale>) {}

  async findAll(): Promise<Sale[]> {
    const sales = await this.model.find().lean();
    return sales;
  }

  async findById(id: number): Promise<Sale> {
    const register = await this.model.findById(id).lean();
    return register;
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Sale>> {
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

  async create(sale: DomainCreateSaleDto): Promise<Sale> {
    const created = new this.model(sale);
    return await created.save();
  }

  async update(id: number, sale: DomainUpdateSaleDto): Promise<Sale> {
    return await this.model.findByIdAndUpdate(id, sale, { new: true }).exec();
  }
}
