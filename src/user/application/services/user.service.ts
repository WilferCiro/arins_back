// Nest
import { Inject, Injectable } from "@nestjs/common";

// Application

// Domain
import { User } from "src/user/domain/entities/user.type";
import { UserRepository } from "src/user/domain/interfaces/user.repository.interface";
import { UserService } from "src/user/domain/interfaces/user.service.interface";
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { DomainCreateUserDto } from "src/user/domain/dto/user.create.dto";
import { DomainUpdateUserDto } from "src/user/domain/dto/user.update.dto";

// Shared
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { generateRandomPassword } from "src/shared/application/helpers/randomPassword";
import { PasswordHelper } from "src/shared/infrastructure/helpers/PasswordHelper";

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @Inject("UserRepository")
    private readonly repository: UserRepository,
    private passwordHelper: PasswordHelper
  ) {}

  async findAll(): Promise<User[]> {
    return await this.repository.findAll();
  }

  async findById(_id: string): Promise<User> {
    return await this.repository.findById(_id);
  }

  async getByEmail(email: string): Promise<User> {
    return await this.repository.findByEmail(email);
  }

  async findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<User>> {
    return await this.repository.findPaginated(pagination);
  }

  async create(user: DomainCreateUserDto): Promise<User> {
    return await this.repository.create(user);
  }

  async restorePassword(_id: string): Promise<boolean> {
    const user = await this.repository.findById(_id);
    if (!user) {
      return false;
    }
    const password = generateRandomPassword(10);
    // TODO: Send EMAIL
    user.password = await this.passwordHelper.encrypt(password);
    const userUdted = await this.repository.update(_id, user);
    return !!userUdted;
  }

  async update(_id: string, user: DomainUpdateUserDto): Promise<User> {
    return await this.repository.update(_id, user);
  }
}
