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
} from '@nestjs/common';

// Application
import { DependencyMapper } from '../mapper/dependency.mapper';
import { CreateDependencyDto } from '../dto/dependency.create.dto';
import { UpdateDependencyDto } from '../dto/dependency.update.dto';
import { DependencyDto } from '../dto/dependency.dto';
// Domain
import { DependencyService } from 'src/dependency/domain/interfaces/dependency.service.interface';
import { Dependency } from 'src/dependency/domain/entities/dependency.type';

// Shared
import { BaseController } from 'src/shared/application/controllers/base.controller';
import { AuthGuard } from 'src/shared/application/middleware/auth.middleware';
import { PaginationMapper } from 'src/shared/application/mapper/pagination.mapper';
import { PaginatedDto } from 'src/shared/application/dto/paginated.get.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

@Controller('dependencies')
export class DependencyController extends BaseController {
  private mapper: DependencyMapper;
  private paginationMapper: PaginationMapper;
  constructor(@Inject('DependencyService') private readonly service: DependencyService) {
    super();
    this.mapper = new DependencyMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @UseGuards(AuthGuard)
  @Get('')
  async findAll(): Promise<DependencyDto[]> {
    const data = await this.service.findAll();
    return data.map((d: Dependency) => this.mapper.toDto(d));
  }

  @UseGuards(AuthGuard)
  @Get('paginated')
  async findPaginated(
    @Query() paginationDto: PaginatedDto,
  ): Promise<PaginatedResultInterface<DependencyDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: Dependency) => this.mapper.toDto(d)),
    };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<DependencyDto> {
    const data = await this.service.findById(id);
    return this.mapper.toDto(data);
  }

  @Post()
  async create(@Body() dependency: CreateDependencyDto): Promise<DependencyDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(dependency));
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dependency: UpdateDependencyDto,
  ): Promise<DependencyDto> {
    const data = await this.service.update(
      id,
      this.mapper.toDomainUpdate(dependency),
    );
    return this.mapper.toDto(data);
  }
}
