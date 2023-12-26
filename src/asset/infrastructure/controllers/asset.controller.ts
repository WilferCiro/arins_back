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
import { AssetMapper } from "../mapper/asset.mapper";
import { CreateAssetDto } from "../dto/asset.create.dto";
import { UpdateAssetDto } from "../dto/asset.update.dto";
import { AssetDto } from "../dto/asset.dto";
// Domain
import { AssetService } from "src/asset/domain/interfaces/asset.service.interface";
import { Asset } from "src/asset/domain/entities/asset.type";

// Shared
import { BaseController } from "src/shared/application/controllers/base.controller";
import { AuthGuard } from "src/shared/application/middleware/auth.middleware";
import { PaginationMapper } from "src/shared/application/mapper/pagination.mapper";
import { PaginatedDto } from "src/shared/application/dto/paginated.get.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";

@Controller("assets")
export class AssetController extends BaseController {
  private mapper: AssetMapper;
  private paginationMapper: PaginationMapper;
  constructor(@Inject("AssetService") private readonly service: AssetService) {
    super();
    this.mapper = new AssetMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @UseGuards(AuthGuard)
  @Get("")
  async findAll(): Promise<AssetDto[]> {
    const data = await this.service.findAll();
    return data.map((d: Asset) => this.mapper.toDto(d));
  }

  @UseGuards(AuthGuard)
  @Get("paginated")
  async findPaginated(
    @Query() paginationDto: PaginatedDto
  ): Promise<PaginatedResultInterface<AssetDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: Asset) => this.mapper.toDto(d)),
    };
  }

  @UseGuards(AuthGuard)
  @Get(":_id")
  async findById(@Param("_id") _id: string): Promise<AssetDto> {
    const data = await this.service.findById(_id);
    return this.mapper.toDto(data);
  }

  @Post()
  async create(@Body() asset: CreateAssetDto): Promise<AssetDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(asset));
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() asset: UpdateAssetDto
  ): Promise<AssetDto> {
    const data = await this.service.update(
      _id,
      this.mapper.toDomainUpdate(asset)
    );
    return this.mapper.toDto(data);
  }
}
