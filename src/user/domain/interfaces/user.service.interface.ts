// Nest

// Domain
import { DomainCreateUserDto } from "../dto/user.create.dto";
import { DomainUpdateUserDto } from "../dto/user.update.dto";
import { User } from "../entities/user.type";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { DomainUpdateUserPasswordDto } from "../dto/user.update_password.dto";

export interface UserService {
  findById(_id: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getProfile(): Promise<User>;
  findAll(): Promise<User[]>;
  findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<User>>;
  create(user: DomainCreateUserDto): Promise<User>;
  restorePassword(_id: string): Promise<boolean>;
  update(_id: string, user: DomainUpdateUserDto): Promise<User>;
  updatePassword(password: DomainUpdateUserPasswordDto): Promise<User>;
}
