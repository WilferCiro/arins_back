// Nest
import {
  Body,
  Controller,
  Get,
  Header,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";

// Application
import { ProductMapper } from "../mapper/product.mapper";
import {
  CreateProductDto,
  CreateProductMassiveDto,
} from "../dto/product.create.dto";
import { UpdateProductDto } from "../dto/product.update.dto";
import { ProductDto } from "../dto/product.dto";
// Domain
import { ProductService } from "src/product/domain/interfaces/product.service.interface";
import { Product } from "src/product/domain/entities/product.type";

// Shared
import { BaseController } from "src/shared/application/controllers/base.controller";
import { AuthGuard } from "src/shared/infrastructure/middleware/auth.middleware";
import { PaginationMapper } from "src/shared/application/mapper/pagination.mapper";
import { PaginatedDto } from "src/shared/application/dto/paginated.get.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { Response } from "express";
import { FilterProductDto } from "../dto/product.filter.dto";

@Controller("products")
export class ProductController extends BaseController {
  private mapper: ProductMapper;
  private paginationMapper: PaginationMapper;
  constructor(
    @Inject("ProductService") private readonly service: ProductService
  ) {
    super();
    this.mapper = new ProductMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @UseGuards(AuthGuard)
  @Get("store/:store_id")
  async findAll(@Param("store_id") store_id: string): Promise<ProductDto[]> {
    const data = await this.service.findAll(store_id);
    return data.map((d: Product) => this.mapper.toDto(d));
  }

  @UseGuards(AuthGuard)
  @Get("paginated")
  async findPaginated(
    @Query() paginationDto: PaginatedDto,
    @Query() filtersDto: FilterProductDto
  ): Promise<PaginatedResultInterface<ProductDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const filters = this.mapper.toDomainFilters(filtersDto);
    console.log(filters)
    const data = await this.service.findPaginated({
      ...pagination,
      ...filters,
    });
    return {
      total: data.total,
      data: data.data.map((d: Product) => this.mapper.toDto(d)),
    };
  }

  @UseGuards(AuthGuard)
  @Get(":_id")
  async findById(@Param("id") _id: string): Promise<ProductDto> {
    const data = await this.service.findById(_id);
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() product: CreateProductDto): Promise<ProductDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(product));
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Post("massive")
  async massive(@Body() { assets }: CreateProductMassiveDto): Promise<number> {
    const assetsDomain = assets.map((asset) =>
      this.mapper.toDomainCreate(asset)
    );
    const data = await this.service.createMassive(assetsDomain);
    return data;
  }

  @UseGuards(AuthGuard)
  @Post("export")
  @Header(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  )
  @Header("Content-Disposition", "attachment; filename=users.xlsx")
  async export(@Body() filters: FilterProductDto, @Res() res: Response) {
    const data = await this.service.export(
      this.mapper.toDomainFilters(filters)
    );
    res.send(data);
  }

  @UseGuards(AuthGuard)
  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() product: UpdateProductDto
  ): Promise<ProductDto> {
    const data = await this.service.update(
      _id,
      this.mapper.toDomainUpdate(product)
    );
    return this.mapper.toDto(data);
  }
}
