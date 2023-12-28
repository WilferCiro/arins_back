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
import { CompanyMapper } from "../mapper/company.mapper";
import { CreateCompanyDto } from "../dto/company.create.dto";
import { UpdateCompanyDto } from "../dto/company.update.dto";
import { CompanyDto } from "../dto/company.dto";
// Domain
import { CompanyService } from "src/company/domain/interfaces/company.service.interface";
import { Company } from "src/company/domain/entities/company.type";

// Shared
import { BaseController } from "src/shared/application/controllers/base.controller";
import { AuthGuard } from "src/shared/infrastructure/middleware/auth.middleware";
import { PaginationMapper } from "src/shared/application/mapper/pagination.mapper";
import { PaginatedDto } from "src/shared/application/dto/paginated.get.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { SelectDto } from "src/shared/application/dto/select.dto";

@Controller("companies")
export class CompanyController extends BaseController {
  private mapper: CompanyMapper;
  private paginationMapper: PaginationMapper;
  constructor(
    @Inject("CompanyService") private readonly service: CompanyService
  ) {
    super();
    this.mapper = new CompanyMapper();
    this.paginationMapper = new PaginationMapper();
  }

  @UseGuards(AuthGuard)
  @Get("")
  async findAll(): Promise<CompanyDto[]> {
    const data = await this.service.findAll();
    return data.map((d: Company) => this.mapper.toDto(d));
  }

  @UseGuards(AuthGuard)
  @Get("paginated")
  async findPaginated(
    @Query() paginationDto: PaginatedDto
  ): Promise<PaginatedResultInterface<CompanyDto>> {
    const pagination = this.paginationMapper.toDomain(paginationDto);
    const data = await this.service.findPaginated(pagination);
    return {
      total: data.total,
      data: data.data.map((d: Company) => this.mapper.toDto(d)),
    };
  }

  @UseGuards(AuthGuard)
  @Get("select")
  async findSelect(@Query() query): Promise<SelectDto[]> {
    const search = query.search || "";
    const data = await this.service.findSelect(search);
    return data.map((d: Company) => this.mapper.toDtoSelect(d));
  }

  @UseGuards(AuthGuard)
  @Get(":_id")
  async findById(@Param("_id") _id: string): Promise<CompanyDto> {
    const data = await this.service.findById(_id);
    return this.mapper.toDto(data);
  }

  @Post()
  async create(@Body() company: CreateCompanyDto): Promise<CompanyDto> {
    const data = await this.service.create(this.mapper.toDomainCreate(company));
    return this.mapper.toDto(data);
  }

  @UseGuards(AuthGuard)
  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() company: UpdateCompanyDto
  ): Promise<CompanyDto> {
    const data = await this.service.update(
      _id,
      this.mapper.toDomainUpdate(company)
    );
    return this.mapper.toDto(data);
  }
}
