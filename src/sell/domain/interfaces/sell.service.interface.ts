// Nest

// Domain
import { DomainCreateSellDto } from '../dto/sell.create.dto';
import { DomainUpdateSellDto } from '../dto/sell.update.dto';
import { Sell } from '../entities/sell.type';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

export interface SellService {
  findById(id: number): Promise<Sell>;
  findAll(): Promise<Sell[]>;
  findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Sell>>;
  create(sell: DomainCreateSellDto): Promise<Sell>;
  update(id: number, sell: DomainUpdateSellDto): Promise<Sell>;
}
