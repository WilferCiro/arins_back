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
import { UserMapper } from "../mapper/user.mapper";
import { CreateUserDto } from "../dto/user.create.dto";
import { UpdateUserDto } from "../dto/user.update.dto";
import { UserDto } from "../dto/user.dto";
// Domain
import { UserService } from "src/user/domain/interfaces/user.service.interface";
import { User } from "src/user/domain/entities/user.type";

// Shared
import { BaseController } from "src/shared/application/controllers/base.controller";
import { AuthGuard } from "src/shared/infrastructure/middleware/auth.middleware";
import { PaginationMapper } from "src/shared/application/mapper/pagination.mapper";
import { PaginatedDto } from "src/shared/application/dto/paginated.get.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { UpdateUserPasswordDto } from "../dto/user.update_password.dto";

@Controller("users")
export class UserController extends BaseController {
  private mapper: UserMapper;
  private paginationMapper: PaginationMapper;
  constructor(@Inject("UserService") private readonly service: UserService) {
    super();
    this.mapper = new UserMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @UseGuards(AuthGuard)
  @Get("paginated")
  async findPaginated(
    @Query() paginationDto: PaginatedDto
  ): Promise<PaginatedResultInterface<UserDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: User) => this.mapper.toDto(d)),
    };
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  async getProfile(): Promise<UserDto> {
    const data = await this.service.getProfile();
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Get(":_id")
  async findById(@Param("_id") _id: string): Promise<UserDto> {
    const data = await this.service.findById(_id);
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() user: CreateUserDto): Promise<UserDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(user));
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
  @Patch("password")
  async updatePassword(
    @Body() user: UpdateUserPasswordDto
  ): Promise<UserDto> {
    const data = await this.service.updatePassword(
      this.mapper.toDomainUpdatePassword(user)
    );
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() user: UpdateUserDto
  ): Promise<UserDto> {
    const data = await this.service.update(
      _id,
      this.mapper.toDomainUpdate(user)
    );
    return this.mapper.toDto(data);
  }
}
