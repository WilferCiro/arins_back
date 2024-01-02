// Nest
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";

// Application
import { SaleMapper } from "../mapper/sale.mapper";
import { CreateSaleDto } from "../dto/sale.create.dto";
import { UpdateSaleDto } from "../dto/sale.update.dto";
import { SaleDto } from "../dto/sale.dto";
// Domain
import { SaleService } from "src/sale/domain/interfaces/sale.service.interface";
import { Sale } from "src/sale/domain/entities/sale.type";

// Shared
import { BaseController } from "src/shared/application/controllers/base.controller";
import { AuthGuard } from "src/shared/infrastructure/middleware/auth.middleware";
import { PaginationMapper } from "src/shared/application/mapper/pagination.mapper";
import { PaginatedDto } from "src/shared/application/dto/paginated.get.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { FilterSaleDto } from "../dto/sale.filter.dto";

@Controller("sales")
export class SaleController extends BaseController {
  private mapper: SaleMapper;
  private paginationMapper: PaginationMapper;
  constructor(@Inject("SaleService") private readonly service: SaleService) {
    super();
    this.mapper = new SaleMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @UseGuards(AuthGuard)
  @Get("paginated")
  async findPaginated(
    @Query() query: PaginatedDto,
    @Query() query2: FilterSaleDto
  ): Promise<PaginatedResultInterface<SaleDto>> {
    const pagination = this.paginationMapper.toDomain(query);
    const filters = this.mapper.toDomainFilters(query2);
    const data = await this.service.findPaginated({
      ...pagination,
      createdAt: filters.createdAt,
    });
    return {
      total: data.total,
      data: data.data.map((d: Sale) => this.mapper.toDto(d)),
    };
  }

  @UseGuards(AuthGuard)
  @Get(":_id")
  async findById(@Param("_id") _id: string): Promise<SaleDto> {
    const data = await this.service.findById(_id);
    return this.mapper.toDto(data);
  }

  @Post()
  async create(@Body() sale: CreateSaleDto): Promise<SaleDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(sale));
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() sale: UpdateSaleDto
  ): Promise<SaleDto> {
    const data = await this.service.update(
      _id,
      this.mapper.toDomainUpdate(sale)
    );
    return this.mapper.toDto(data);
  }
}
