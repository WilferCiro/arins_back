// Nest

// Domain
import { DomainCreateUserDto } from '../dto/user.create.dto';
import { DomainUpdateUserDto } from '../dto/user.update.dto';
import { User } from '../entities/user.type';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

export interface UserService {
  findById(id: number): Promise<User>;
  findAll(): Promise<User[]>;
  findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<User>>;
  create(user: DomainCreateUserDto): Promise<User>;
  update(id: number, user: DomainUpdateUserDto): Promise<User>;
}
