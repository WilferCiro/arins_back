// Nest
import { Inject, Injectable } from '@nestjs/common';

// Application

// Domain
import { User } from 'src/user/domain/entities/user.type';
import { UserRepository } from 'src/user/domain/interfaces/user.repository.interface';
import { UserService } from 'src/user/domain/interfaces/user.service.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { DomainCreateUserDto } from 'src/user/domain/dto/user.create.dto';
import { DomainUpdateUserDto } from 'src/user/domain/dto/user.update.dto';

// Shared
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<User> {
    return await this.repository.findById(id);
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<User>> {
    return await this.repository.findPaginated(pagination);
  }

  async create(user: DomainCreateUserDto): Promise<User> {
    return await this.repository.create(user);
  }

  async update(id: number, user: DomainUpdateUserDto): Promise<User> {
    return await this.repository.update(id, user);
  }
}
