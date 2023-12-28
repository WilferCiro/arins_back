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
import { DependencyMapper } from "../mapper/dependency.mapper";
import { CreateDependencyDto } from "../dto/dependency.create.dto";
import { UpdateDependencyDto } from "../dto/dependency.update.dto";
import { DependencyDto } from "../dto/dependency.dto";
// Domain
import { DependencyService } from "src/dependency/domain/interfaces/dependency.service.interface";
import { Dependency } from "src/dependency/domain/entities/dependency.type";

// Shared
import { BaseController } from "src/shared/application/controllers/base.controller";
import { AuthGuard } from "src/shared/infrastructure/middleware/auth.middleware";
import { PaginationMapper } from "src/shared/application/mapper/pagination.mapper";
import { PaginatedDto } from "src/shared/application/dto/paginated.get.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { SelectDto } from "src/shared/application/dto/select.dto";

@Controller("dependencies")
export class DependencyController extends BaseController {
  private mapper: DependencyMapper;
  private paginationMapper: PaginationMapper;
  constructor(
    @Inject("DependencyService") private readonly service: DependencyService
  ) {
    super();
    this.mapper = new DependencyMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @UseGuards(AuthGuard)
  @Get("")
  async findAll(): Promise<DependencyDto[]> {
    const data = await this.service.findAll();
    return data.map((d: Dependency) => this.mapper.toDto(d));
  }

  @UseGuards(AuthGuard)
  @Get("paginated")
  async findPaginated(
    @Query() paginationDto: PaginatedDto
  ): Promise<PaginatedResultInterface<DependencyDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: Dependency) => this.mapper.toDto(d)),
    };
  }

  @UseGuards(AuthGuard)
  @Get("select")
  async findSelect(@Query() query): Promise<SelectDto[]> {
    const search = query.search || "";
    const data = await this.service.findSelect(search);
    return data.map((d: Dependency) => this.mapper.toDtoSelect(d));
  }

  @UseGuards(AuthGuard)
  @Get(":_id")
  async findById(@Param("_id") _id: string): Promise<DependencyDto> {
    const data = await this.service.findById(_id);
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() dependency: CreateDependencyDto
  ): Promise<DependencyDto> {
    const data = await this.service.create(
      this.mapper.toDomainCreate(dependency)
    );
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() dependency: UpdateDependencyDto
  ): Promise<DependencyDto> {
    const data = await this.service.update(
      _id,
      this.mapper.toDomainUpdate(dependency)
    );
    return this.mapper.toDto(data);
  }
}
