// Nest

// Domain
import { DomainCreateStoreDto } from "../dto/store.create.dto";
import { DomainUpdateStoreDto } from "../dto/store.update.dto";
import { Store } from "../entities/store.type";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";

export interface StoreRepository {
  findById(_id: string): Promise<Store>;
  findAll(company_id: string): Promise<Store[]>;
  findPaginated(
    pagination: DomainPaginationDto,
    company_id: string
  ): Promise<PaginatedResultInterface<Store>>;
  findSelect(query: string, company_id: string): Promise<Store[]>;

  create(store: DomainCreateStoreDto, company_id: string): Promise<Store>;
  update(_id: string, store: DomainUpdateStoreDto): Promise<Store>;
}
