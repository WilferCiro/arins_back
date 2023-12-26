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
import { StoreMapper } from "../mapper/store.mapper";
import { CreateStoreDto } from "../dto/store.create.dto";
import { UpdateStoreDto } from "../dto/store.update.dto";
import { StoreDto } from "../dto/store.dto";
// Domain
import { StoreService } from "src/store/domain/interfaces/store.service.interface";
import { Store } from "src/store/domain/entities/store.type";

// Shared
import { BaseController } from "src/shared/application/controllers/base.controller";
import { AuthGuard } from "src/shared/application/middleware/auth.middleware";
import { PaginationMapper } from "src/shared/application/mapper/pagination.mapper";
import { PaginatedDto } from "src/shared/application/dto/paginated.get.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { SelectDto } from "src/shared/application/dto/select.dto";

@Controller("stores")
export class StoreController extends BaseController {
  private mapper: StoreMapper;
  private paginationMapper: PaginationMapper;
  constructor(@Inject("StoreService") private readonly service: StoreService) {
    super();
    this.mapper = new StoreMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @UseGuards(AuthGuard)
  @Get("")
  async findAll(): Promise<StoreDto[]> {
    const data = await this.service.findAll();
    return data.map((d: Store) => this.mapper.toDto(d));
  }

  @UseGuards(AuthGuard)
  @Get("paginated")
  async findPaginated(
    @Query() paginationDto: PaginatedDto
  ): Promise<PaginatedResultInterface<StoreDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: Store) => this.mapper.toDto(d)),
    };
  }

  @UseGuards(AuthGuard)
  @Get("select")
  async findSelect(@Query() query): Promise<SelectDto[]> {
    const search = query.search || "";
    const data = await this.service.findSelect(search);
    return data.map((d: Store) => this.mapper.toDtoSelect(d));
  }

  @UseGuards(AuthGuard)
  @Get(":_id")
  async findById(@Param("_id") _id: string): Promise<StoreDto> {
    const data = await this.service.findById(_id);
    return this.mapper.toDto(data);
  }

  @Post()
  async create(@Body() store: CreateStoreDto): Promise<StoreDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(store));
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() store: UpdateStoreDto
  ): Promise<StoreDto> {
    const data = await this.service.update(
      _id,
      this.mapper.toDomainUpdate(store)
    );
    return this.mapper.toDto(data);
  }
}
