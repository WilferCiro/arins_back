// Nestjs
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Infraestructure

// Application

// Domain
import { User } from '../../../domain/entities/user.type';
import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
import { DomainCreateUserDto } from 'src/user/domain/dto/user.create.dto';
import { DomainUpdateUserDto } from 'src/user/domain/dto/user.update.dto';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectModel('User') private readonly model: Model<User>) {}

  async findAll(): Promise<User[]> {
    const users = await this.model.find().lean();
    return users;
  }

  async findById(id: number): Promise<User> {
    const register = await this.model.findById(id).lean();
    return register;
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<User>> {
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

  async create(user: DomainCreateUserDto): Promise<User> {
    const created = new this.model(user);
    return await created.save();
  }

  async update(id: number, user: DomainUpdateUserDto): Promise<User> {
    return await this.model.findByIdAndUpdate(id, user, { new: true }).exec();
  }
}
