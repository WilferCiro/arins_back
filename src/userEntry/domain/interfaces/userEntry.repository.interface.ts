// Nest

// Domain
import { DomainCreateUserEntryDto } from "../dto/userEntry.create.dto";
import { DomainUpdateUserEntryDto } from "../dto/userEntry.update.dto";
import { UserEntry } from "../entities/userEntry.type";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";

export interface UserEntryRepository {
  findById(_id: string): Promise<UserEntry>;
  findAll(): Promise<UserEntry[]>;
  findByEmail(email: string): Promise<UserEntry>;
  findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<UserEntry>>;

  create(userEntry: DomainCreateUserEntryDto): Promise<UserEntry>;

  update(_id: string, userEntry: DomainUpdateUserEntryDto): Promise<UserEntry>;
}
