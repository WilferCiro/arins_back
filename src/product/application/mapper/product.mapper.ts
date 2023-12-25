// Nest
import { Injectable } from '@nestjs/common';

// Application
import { ProductDto } from '../dto/product.dto';

// Domain
import { Product } from 'src/product/domain/entities/product.type';
import { CreateProductDto } from '../dto/product.create.dto';
import { UpdateProductDto } from '../dto/product.update.dto';
import { DomainCreateProductDto } from 'src/product/domain/dto/product.create.dto';
import { DomainUpdateProductDto } from 'src/product/domain/dto/product.update.dto';

// Shared

@Injectable()
export class ProductMapper {
  toDomainCreate(productDto: CreateProductDto): DomainCreateProductDto {
    const { active, name } = productDto;
    return { active, name };
  }

  toDomainUpdate(productDto: UpdateProductDto): DomainUpdateProductDto {
    const { active, name } = productDto;
    return { active, name };
  }

  toDto(product: Product): ProductDto {
    return product as ProductDto;
  }
}
