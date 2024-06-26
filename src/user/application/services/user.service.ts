// Nest
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";

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
import { RequestContextService } from "src/modules/context/domain/interfaces/context.service.interface";
import { DomainUpdateUserPasswordDto } from "src/user/domain/dto/user.update_password.dto";

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @Inject("UserRepository")
    private readonly repository: UserRepository,
    private passwordHelper: PasswordHelper,
    @Inject("RequestContext")
    private readonly contextService: RequestContextService
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

  async getProfile(): Promise<User> {
    const user_id = this.contextService.get<string | undefined>("user_id");
    return await this.findById(user_id);
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

  async updatePassword(password: DomainUpdateUserPasswordDto): Promise<User> {
    const user_id = this.contextService.get<string | undefined>("user_id");
    const user = await this.repository.findById(user_id);
    if (!user) {
      throw new UnauthorizedException("Revisa los datos ingresados");
    }
    const isMatch = await this.passwordHelper.compare(
      password.last_password,
      user?.password
    );
    if (!isMatch) {
      throw new UnauthorizedException("Revisa tu contraseña actual");
    }
    // TODO: Send EMAIL
    user.password = await this.passwordHelper.encrypt(password.password);
    const userUdted = await this.repository.update(user_id, user);
    return userUdted;
  }
}
