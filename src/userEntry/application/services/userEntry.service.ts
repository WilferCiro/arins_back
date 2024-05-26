// Nest
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";

// Application

// Domain
import { UserEntry } from "src/userEntry/domain/entities/userEntry.type";
import { UserEntryRepository } from "src/userEntry/domain/interfaces/userEntry.repository.interface";
import { UserEntryService } from "src/userEntry/domain/interfaces/userEntry.service.interface";
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { DomainCreateUserEntryDto } from "src/userEntry/domain/dto/userEntry.create.dto";
import { DomainUpdateUserEntryDto } from "src/userEntry/domain/dto/userEntry.update.dto";

// Shared
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { generateRandomPassword } from "src/shared/application/helpers/randomPassword";
import { PasswordHelper } from "src/shared/infrastructure/helpers/PasswordHelper";
import { RequestContextService } from "src/modules/context/domain/interfaces/context.service.interface";

@Injectable()
export class UserEntryServiceImpl implements UserEntryService {
  constructor(
    @Inject("UserEntryRepository")
    private readonly repository: UserEntryRepository,
    private passwordHelper: PasswordHelper,
    @Inject("RequestContext")
    private readonly contextService: RequestContextService
  ) {}

  async findAll(): Promise<UserEntry[]> {
    return await this.repository.findAll();
  }

  async findById(_id: string): Promise<UserEntry> {
    return await this.repository.findById(_id);
  }

  async getByEmail(email: string): Promise<UserEntry> {
    return await this.repository.findByEmail(email);
  }

  async getProfile(): Promise<UserEntry> {
    const userEntry_id = this.contextService.get<string | undefined>("userEntry_id");
    return await this.findById(userEntry_id);
  }

  async findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<UserEntry>> {
    return await this.repository.findPaginated(pagination);
  }

  async create(userEntry: DomainCreateUserEntryDto): Promise<UserEntry> {
    return await this.repository.create(userEntry);
  }

  async restorePassword(_id: string): Promise<boolean> {
    const userEntry = await this.repository.findById(_id);
    if (!userEntry) {
      return false;
    }
    const password = generateRandomPassword(10);
    // TODO: Send EMAIL
    userEntry.password = await this.passwordHelper.encrypt(password);
    const userEntryUdted = await this.repository.update(_id, userEntry);
    return !!userEntryUdted;
  }

  async update(_id: string, userEntry: DomainUpdateUserEntryDto): Promise<UserEntry> {
    return await this.repository.update(_id, userEntry);
  }
}
