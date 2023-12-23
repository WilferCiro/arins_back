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
import { UserMapper } from '../mapper/user.mapper';
import { CreateUserDto } from '../dto/user.create.dto';
import { UpdateUserDto } from '../dto/user.update.dto';
import { UserDto } from '../dto/user.dto';
// Domain
import { UserService } from 'src/user/domain/interfaces/user.service.interface';
import { User } from 'src/user/domain/entities/user.type';

// Shared
import { BaseController } from 'src/shared/application/controllers/base.controller';
import { AuthGuard } from 'src/shared/application/middleware/auth.middleware';
import { PaginationMapper } from 'src/shared/application/mapper/pagination.mapper';
import { PaginatedDto } from 'src/shared/application/dto/paginated.get.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

@Controller('users')
export class UserController extends BaseController {
  private mapper: UserMapper;
  private paginationMapper: PaginationMapper;
  constructor(@Inject('UserService') private readonly service: UserService) {
    super();
    this.mapper = new UserMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @UseGuards(AuthGuard)
  @Get('')
  async findAll(): Promise<UserDto[]> {
    const data = await this.service.findAll();
    return data.map((d: User) => this.mapper.toDto(d));
  }

  @UseGuards(AuthGuard)
  @Get('paginated')
  async findPaginated(
    @Query() paginationDto: PaginatedDto,
  ): Promise<PaginatedResultInterface<UserDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: User) => this.mapper.toDto(d)),
    };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: number): Promise<UserDto> {
    const data = await this.service.findById(id);
    return this.mapper.toDto(data);
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<UserDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(user));
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
  ): Promise<UserDto> {
    const data = await this.service.update(
      id,
      this.mapper.toDomainUpdate(user),
    );
    return this.mapper.toDto(data);
  }
}
