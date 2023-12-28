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
import { SellMapper } from "../mapper/sell.mapper";
import { CreateSellDto } from "../dto/sell.create.dto";
import { UpdateSellDto } from "../dto/sell.update.dto";
import { SellDto } from "../dto/sell.dto";
// Domain
import { SellService } from "src/sell/domain/interfaces/sell.service.interface";
import { Sell } from "src/sell/domain/entities/sell.type";

// Shared
import { BaseController } from "src/shared/application/controllers/base.controller";
import { PaginationMapper } from "src/shared/application/mapper/pagination.mapper";
import { PaginatedDto } from "src/shared/application/dto/paginated.get.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { AuthGuard } from "src/shared/infrastructure/middleware/auth.middleware";

@Controller("sells")
export class SellController extends BaseController {
  private mapper: SellMapper;
  private paginationMapper: PaginationMapper;
  constructor(@Inject("SellService") private readonly service: SellService) {
    super();
    this.mapper = new SellMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @UseGuards(AuthGuard)
  @Get("")
  async findAll(): Promise<SellDto[]> {
    const data = await this.service.findAll();
    return data.map((d: Sell) => this.mapper.toDto(d));
  }

  @UseGuards(AuthGuard)
  @Get("paginated")
  async findPaginated(
    @Query() paginationDto: PaginatedDto
  ): Promise<PaginatedResultInterface<SellDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: Sell) => this.mapper.toDto(d)),
    };
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findById(@Param("id") id: number): Promise<SellDto> {
    const data = await this.service.findById(id);
    return this.mapper.toDto(data);
  }

  @Post()
  async create(@Body() sell: CreateSellDto): Promise<SellDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(sell));
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() sell: UpdateSellDto
  ): Promise<SellDto> {
    const data = await this.service.update(
      id,
      this.mapper.toDomainUpdate(sell)
    );
    return this.mapper.toDto(data);
  }
}
