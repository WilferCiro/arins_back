// Nest
import { Inject, Injectable } from '@nestjs/common';

// Application

// Domain
import { Sale } from 'src/sale/domain/entities/sale.type';
import { SaleRepository } from 'src/sale/domain/interfaces/sale.repository.interface';
import { SaleService } from 'src/sale/domain/interfaces/sale.service.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { DomainCreateSaleDto } from 'src/sale/domain/dto/sale.create.dto';
import { DomainUpdateSaleDto } from 'src/sale/domain/dto/sale.update.dto';

// Shared
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

@Injectable()
export class SaleServiceImpl implements SaleService {
  constructor(
    @Inject('SaleRepository')
    private readonly repository: SaleRepository,
  ) {}

  async findAll(): Promise<Sale[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<Sale> {
    return await this.repository.findById(id);
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Sale>> {
    return await this.repository.findPaginated(pagination);
  }

  async create(sale: DomainCreateSaleDto): Promise<Sale> {
    return await this.repository.create(sale);
  }

  async update(id: number, sale: DomainUpdateSaleDto): Promise<Sale> {
    return await this.repository.update(id, sale);
  }
}