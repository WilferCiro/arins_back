// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Infraestructure

// Application

// Domain
import { Product } from '../../../domain/entities/product.type';
import { ProductRepository } from '../../../domain/interfaces/product.repository.interface';
import { DomainCreateProductDto } from 'src/product/domain/dto/product.create.dto';
import { DomainUpdateProductDto } from 'src/product/domain/dto/product.update.dto';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(@InjectModel('Product') private readonly model: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    const products = await this.model.find().lean();
    return products;
  }

  async findById(id: number): Promise<Product> {
    const register = await this.model.findById(id).lean();
    return register;
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Product>> {
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

  async create(product: DomainCreateProductDto): Promise<Product> {
    const created = new this.model(product);
    return await created.save();
  }

  async update(id: number, product: DomainUpdateProductDto): Promise<Product> {
    return await this.model.findByIdAndUpdate(id, product, { new: true }).exec();
  }
}
