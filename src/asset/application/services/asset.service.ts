// Nest
import { Inject, Injectable } from "@nestjs/common";

// Application

// Domain
import { Asset } from "src/asset/domain/entities/asset.type";
import { AssetRepository } from "src/asset/domain/interfaces/asset.repository.interface";
import { AssetService } from "src/asset/domain/interfaces/asset.service.interface";
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { DomainCreateAssetDto } from "src/asset/domain/dto/asset.create.dto";
import { DomainUpdateAssetDto } from "src/asset/domain/dto/asset.update.dto";

// Shared
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { DomainFilterAssetDto } from "src/asset/domain/dto/assets.filter.dto";
import { assetsExcelHeaders } from "../constants/assets.excel_header";
import { FilesServiceInterface } from "src/modules/files/domain/interfaces/files.service.interface";
import { RequestContextService } from "src/modules/context/domain/interfaces/context.service.interface";

@Injectable()
export class AssetServiceImpl implements AssetService {
  constructor(
    @Inject("AssetRepository")
    private readonly repository: AssetRepository,
    @Inject("FilesService")
    private readonly filesService: FilesServiceInterface,
    @Inject("RequestContext")
    private readonly contextService: RequestContextService
  ) {}

  async findAll(): Promise<Asset[]> {
    const company_id = this.contextService.get<string | undefined>("company");
    return await this.repository.findAll(company_id);
  }

  async findById(_id: string): Promise<Asset> {
    const company_id = this.contextService.get<string | undefined>("company");
    return await this.repository.findById(_id, company_id);
  }

  async findPaginated(
    pagination: DomainPaginationDto & DomainFilterAssetDto
  ): Promise<PaginatedResultInterface<Asset>> {
    const company_id = this.contextService.get<string | undefined>("company");
    const filtersRepo = this.repository.formatFilters(pagination);
    return await this.repository.findPaginated(
      pagination,
      filtersRepo,
      company_id
    );
  }

  async create(asset: DomainCreateAssetDto): Promise<Asset> {
    return await this.repository.create(asset);
  }
  async createMassive(assets: DomainCreateAssetDto[]): Promise<number> {
    return await this.repository.createMassive(assets);
  }

  async export(filters: DomainFilterAssetDto): Promise<Buffer> {
    const company_id = this.contextService.get<string | undefined>("company");
    const filtersRepo = this.repository.formatFilters(filters);
    const data = await this.repository.findByFilter(filtersRepo, company_id);
    const newData = data.map((dep) => ({
      ...dep,
      dependency: dep.dependency.name,
    }));
    const columns = assetsExcelHeaders;
    return this.filesService.generateExcel(newData, columns);
  }

  async update(_id: string, asset: DomainUpdateAssetDto): Promise<Asset> {
    return await this.repository.update(_id, asset);
  }
}
