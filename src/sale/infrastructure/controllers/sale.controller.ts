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
  @Get("")
  async findAll(): Promise<SaleDto[]> {
    const data = await this.service.findAll();
    return data.map((d: Sale) => this.mapper.toDto(d));
  }

  @UseGuards(AuthGuard)
  @Get("paginated")
  async findPaginated(
    @Query() paginationDto: PaginatedDto
  ): Promise<PaginatedResultInterface<SaleDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: Sale) => this.mapper.toDto(d)),
    };
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findById(@Param("id") id: number): Promise<SaleDto> {
    const data = await this.service.findById(id);
    return this.mapper.toDto(data);
  }

  @Post()
  async create(@Body() sale: CreateSaleDto): Promise<SaleDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(sale));
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() sale: UpdateSaleDto
  ): Promise<SaleDto> {
    const data = await this.service.update(
      id,
      this.mapper.toDomainUpdate(sale)
    );
    return this.mapper.toDto(data);
  }
}
