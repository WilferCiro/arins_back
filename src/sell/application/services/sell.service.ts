// Nest
import { Inject, Injectable } from "@nestjs/common";

// Application

// Domain
import { Sell } from "src/sell/domain/entities/sell.type";
import { SellRepository } from "src/sell/domain/interfaces/sell.repository.interface";
import { SellService } from "src/sell/domain/interfaces/sell.service.interface";
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { DomainCreateSellDto } from "src/sell/domain/dto/sell.create.dto";
import { DomainUpdateSellDto } from "src/sell/domain/dto/sell.update.dto";

// Shared
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";

@Injectable()
export class SellServiceImpl implements SellService {
  constructor(
    @Inject("SellRepository")
    private readonly repository: SellRepository
  ) {}

  async findAll(): Promise<Sell[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<Sell> {
    return await this.repository.findById(id);
  }

  async findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<Sell>> {
    return await this.repository.findPaginated(pagination);
  }

  async create(sell: DomainCreateSellDto): Promise<Sell> {
    return await this.repository.create(sell);
  }

  async update(id: number, sell: DomainUpdateSellDto): Promise<Sell> {
    return await this.repository.update(id, sell);
  }
}
