// Nest
import { Inject, Injectable } from "@nestjs/common";

// Application

// Domain
import { Store } from "src/store/domain/entities/store.type";
import { StoreRepository } from "src/store/domain/interfaces/store.repository.interface";
import { StoreService } from "src/store/domain/interfaces/store.service.interface";
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { DomainCreateStoreDto } from "src/store/domain/dto/store.create.dto";
import { DomainUpdateStoreDto } from "src/store/domain/dto/store.update.dto";

// Shared
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { RequestContextService } from "src/modules/context/domain/interfaces/context.service.interface";

@Injectable()
export class StoreServiceImpl implements StoreService {
  constructor(
    @Inject("StoreRepository")
    private readonly repository: StoreRepository,
    @Inject("RequestContext")
    private readonly contextService: RequestContextService
  ) {}

  async findAll(): Promise<Store[]> {
    const company_id = this.contextService.get<string | undefined>("company");
    return await this.repository.findAll(company_id);
  }

  async findById(_id: string): Promise<Store> {
    return await this.repository.findById(_id);
  }

  async findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<Store>> {
    const company_id = this.contextService.get<string | undefined>("company");
    return await this.repository.findPaginated(pagination, company_id);
  }

  async findSelect(query: string): Promise<Store[]> {
    const company_id = this.contextService.get<string | undefined>("company");
    return await this.repository.findSelect(query, company_id);
  }

  async create(store: DomainCreateStoreDto): Promise<Store> {
    const company_id = this.contextService.get<string | undefined>("company");
    return await this.repository.create(store, company_id);
  }

  async update(_id: string, store: DomainUpdateStoreDto): Promise<Store> {
    return await this.repository.update(_id, store);
  }
}
