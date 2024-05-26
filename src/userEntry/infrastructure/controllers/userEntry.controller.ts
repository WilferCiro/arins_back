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
import { UserEntryMapper } from "../mapper/userEntry.mapper";
import { CreateUserEntryDto } from "../dto/userEntry.create.dto";
import { UpdateUserEntryDto } from "../dto/userEntry.update.dto";
import { UserEntryDto } from "../dto/userEntry.dto";
// Domain
import { UserEntryService } from "src/userEntry/domain/interfaces/userEntry.service.interface";
import { UserEntry } from "src/userEntry/domain/entities/userEntry.type";

// Shared
import { BaseController } from "src/shared/application/controllers/base.controller";
import { AuthGuard } from "src/shared/infrastructure/middleware/auth.middleware";
import { PaginationMapper } from "src/shared/application/mapper/pagination.mapper";
import { PaginatedDto } from "src/shared/application/dto/paginated.get.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";

@Controller("UserEntry")
export class UserEntryController extends BaseController {
  private mapper: UserEntryMapper;
  private paginationMapper: PaginationMapper;
  constructor(@Inject("UserEntryService") private readonly service: UserEntryService) {
    super();
    this.mapper = new UserEntryMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @UseGuards(AuthGuard)
  @Get("paginated")
  async findPaginated(
    @Query() paginationDto: PaginatedDto
  ): Promise<PaginatedResultInterface<UserEntryDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: UserEntry) => this.mapper.toDto(d)),
    };
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  async getProfile(): Promise<UserEntryDto> {
    const data = await this.service.getProfile();
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Get(":_id")
  async findById(@Param("_id") _id: string): Promise<UserEntryDto> {
    const data = await this.service.findById(_id);
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() userEntry: CreateUserEntryDto): Promise<UserEntryDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(userEntry));
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Post(":_id/restore_password")
  async restorePassword(@Param("_id") _id: string) {
    const data = await this.service.restorePassword(_id);
    return {
      success: data,
    };
  }

  @UseGuards(AuthGuard)
  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() userEntry: UpdateUserEntryDto
  ): Promise<UserEntryDto> {
    const data = await this.service.update(
      _id,
      this.mapper.toDomainUpdate(userEntry)
    );
    return this.mapper.toDto(data);
  }
}
