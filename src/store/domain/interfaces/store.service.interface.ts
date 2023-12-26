// Nest

// Domain
import { DomainCreateStoreDto } from "../dto/store.create.dto";
import { DomainUpdateStoreDto } from "../dto/store.update.dto";
import { Store } from "../entities/store.type";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";

export interface StoreService {
  findById(_id: string): Promise<Store>;
  findAll(): Promise<Store[]>;
  findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<Store>>;
  findSelect(query: string): Promise<Store[]>;
  create(store: DomainCreateStoreDto): Promise<Store>;
  update(_id: string, store: DomainUpdateStoreDto): Promise<Store>;
}
