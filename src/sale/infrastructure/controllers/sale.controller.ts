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
import { Response } from "express";
import { CreateSubSaleDto } from "../dto/sale.create_subsale.dto";
import { CreateSaleOrderDto } from "../dto/sale.create_order.dto";
import { DomainActiveSaleDto } from "src/sale/domain/dto/sale.active.dto";
import { SaleSimpleDto } from "../dto/sale.simple.dto";

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
  ): Promise<PaginatedResultInterface<SaleSimpleDto>> {
    const pagination = this.paginationMapper.toDomain(query);
    const filters = this.mapper.toDomainFilters(query2);
    const data = await this.service.findPaginated({
      ...pagination,
      createdAt: filters.createdAt,
      store_id: filters.store_id,
    });
    return {
      total: data.total,
      data: data.data.map((d: Sale) => this.mapper.toSimpleDto(d)),
    };
  }

  @UseGuards(AuthGuard)
  @Get("active")
  async findActive(): Promise<DomainActiveSaleDto[]> {
    const data = await this.service.findActive();
    return data.map((d: DomainActiveSaleDto) => this.mapper.toDtoActive(d));
  }

  @UseGuards(AuthGuard)
  @Get(":_id")
  async findById(@Param("_id") _id: string): Promise<SaleSimpleDto> {
    const data = await this.service.findById(_id);
    return this.mapper.toSimpleDto(data);
  }

  @UseGuards(AuthGuard)
  @Get(":_id/complete")
  async findCompleteById(@Param("_id") _id: string): Promise<SaleDto> {
    const data = await this.service.findById(_id);
    return this.mapper.toDto(data);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() sale: CreateSaleDto): Promise<SaleDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(sale));
    return this.mapper.toDto(data);
  }

  @Post("subsale")
  @UseGuards(AuthGuard)
  async createSale(@Body() sale: CreateSubSaleDto): Promise<SaleDto> {
    const data = await this.service.createSubSale(
      this.mapper.toDomainCreateSubSale(sale)
    );
    return this.mapper.toDto(data);
  }

  @Post("order")
  @UseGuards(AuthGuard)
  async createOrder(@Body() sale: CreateSaleOrderDto): Promise<SaleDto> {
    const data = await this.service.createOrder(
      this.mapper.toDomainCreateOrder(sale)
    );
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Post("export")
  @Header(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  )
  @Header("Content-Disposition", "attachment; filename=users.xlsx")
  async export(@Body() filters: FilterSaleDto, @Res() res: Response) {
    const data = await this.service.export(
      this.mapper.toDomainFilters(filters)
    );
    res.send(data);
  }

  @UseGuards(AuthGuard)
  @Post("export/:_id")
  @Header(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  )
  @Header("Content-Disposition", "attachment; filename=users.xlsx")
  async exportById(@Param("_id") _id: string, @Res() res: Response) {
    const data = await this.service.exportById(_id);
    res.send(data);
  }

  @UseGuards(AuthGuard)
  @Get("invoice/:_id")
  @Header(
    "Content-Type",
    "application/pdf"
  )
  @Header("Content-Disposition", "attachment; filename=invoice.pdf")
  async exportInvoice(@Param("_id") _id: string, @Query("sale_id") sale_id: string, @Res() res: Response) {
    const data = await this.service.exportInvoice(_id, sale_id);
    res.send(data);
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
