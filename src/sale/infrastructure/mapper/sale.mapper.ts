// Nest
import { Injectable } from "@nestjs/common";

// Application
import { SaleDto } from "../dto/sale.dto";

// Domain
import { Sale } from "src/sale/domain/entities/sale.type";
import { CreateSaleDto } from "../dto/sale.create.dto";
import { UpdateSaleDto } from "../dto/sale.update.dto";
import { DomainCreateSaleDto } from "src/sale/domain/dto/sale.create.dto";
import { DomainUpdateSaleDto } from "src/sale/domain/dto/sale.update.dto";
import { FilterSaleDto } from "../dto/sale.filter.dto";
import { DomainFilterSaleDto } from "src/sale/domain/dto/sale.filter.dto";

// Shared

@Injectable()
export class SaleMapper {
  toDomainCreate(saleDto: CreateSaleDto): DomainCreateSaleDto {
    const { initialMoney } = saleDto;
    return { initialMoney };
  }

  toDomainUpdate(saleDto: UpdateSaleDto): DomainUpdateSaleDto {
    const { active, name } = saleDto;
    return { active, name };
  }
  toDomainFilters(filtersDto: FilterSaleDto): DomainFilterSaleDto {
    const { createdAt } = filtersDto;
    return {
      createdAt,
    };
  }

  toDto(sale: Sale): SaleDto {
    return sale as SaleDto;
  }
}
