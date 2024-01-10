// Nest
import { Injectable } from "@nestjs/common";

// Application
import { ProductDto } from "../dto/product.dto";

// Domain
import { Product } from "src/product/domain/entities/product.type";
import { CreateProductDto } from "../dto/product.create.dto";
import { UpdateProductDto } from "../dto/product.update.dto";
import { DomainCreateProductDto } from "src/product/domain/dto/product.create.dto";
import { DomainUpdateProductDto } from "src/product/domain/dto/product.update.dto";
import { SelectDto } from "src/shared/application/dto/select.dto";
import { FilterProductDto } from "../dto/product.filter.dto";
import { DomainFilterProductDto } from "src/product/domain/dto/product.filter.dto";
import { formatArrayString } from "src/shared/application/helpers/formatArrayString";

// Shared

@Injectable()
export class ProductMapper {
  toDomainCreate(productDto: CreateProductDto): DomainCreateProductDto {
    const {
      name,
      description,
      barcode,
      price,
      quantity,
      presentation,
      store_id,
      iva,
    } = productDto;
    return {
      name,
      description,
      barcode,
      price,
      quantity,
      presentation,
      store_id,
      iva,
    };
  }

  toDomainUpdate(productDto: UpdateProductDto): DomainUpdateProductDto {
    const { name, description, barcode, price, quantity, presentation, iva } =
      productDto;
    return { name, description, barcode, price, quantity, presentation, iva };
  }

  toDto(product: Product): ProductDto {
    return {
      ...product,
      store_id: product.store?._id,
    } as ProductDto;
  }

  toDomainFilters(filters: FilterProductDto): DomainFilterProductDto {
    return {
      ...filters,
      store_id: formatArrayString(filters.store_id),
    } as DomainFilterProductDto;
  }
}
