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
import { CreateSubSaleDto } from "../dto/sale.create_subsale.dto";
import { DomainCreateSubSaleDto } from "src/sale/domain/dto/sale.subsale_create.dto";
import { CreateSaleOrderDto } from "../dto/sale.create_order.dto";
import { DomainCreateSaleOrderDto } from "src/sale/domain/dto/sale.order_create.dto";
import { DomainActiveSaleDto } from "src/sale/domain/dto/sale.active.dto";
import { SaleSimpleDto } from "../dto/sale.simple.dto";
import { getTotalOrders, getTotalSales, getTotalSalesIva } from "src/sale/application/utils/sale.calculators";

// Shared

@Injectable()
export class SaleMapper {
  toDomainCreate(saleDto: CreateSaleDto): DomainCreateSaleDto {
    const { store_id, initialMoney } = saleDto;
    return { store_id, initialMoney };
  }

  toDomainCreateSubSale(saleDto: CreateSubSaleDto): DomainCreateSubSaleDto {
    return {
      products: saleDto.products,
      sale_id: saleDto.sale_id,
    };
  }

  toDomainCreateOrder(orderDto: CreateSaleOrderDto): DomainCreateSaleOrderDto {
    return {
      price: orderDto.price,
      sale_id: orderDto.sale_id,
      description: orderDto.description,
    };
  }

  toDomainUpdate(saleDto: UpdateSaleDto): DomainUpdateSaleDto {
    const { active, name } = saleDto;
    return { active, name };
  }
  toDomainFilters(filtersDto: FilterSaleDto): DomainFilterSaleDto {
    const { createdAt, store_id } = filtersDto;
    return {
      createdAt,
      store_id,
    };
  }

  toDto(sale: Sale): SaleDto {
    return { ...sale, store_id: sale.store._id } as SaleDto;
  }

  toSimpleDto(sale: Sale): SaleSimpleDto {
    const result: SaleSimpleDto = {
      _id: sale._id,
      createdAt: sale.createdAt,
      initialMoney: sale.initialMoney,
      finalMoney: sale.initialMoney +
        getTotalSales(sale) -
        getTotalOrders(sale),
      orders: {
        total: getTotalOrders(sale),
        count: sale.orders.length
      },
      sales: {
        total: getTotalSales(sale),
        iva: getTotalSalesIva(sale),
        count: sale.sales.length
      },
      store: sale.store,
      store_id: sale.store._id
    }
    return result;
  }

  toDtoActive(sales: DomainActiveSaleDto) {
    return sales;
  }
}
