// Nest

// Domain
import { DomainCreateAssetDto } from "../dto/asset.create.dto";
import { DomainUpdateAssetDto } from "../dto/asset.update.dto";
import { Asset } from "../entities/asset.type";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { DomainFilterAssetDto } from "../dto/assets.filter.dto";

export interface AssetRepository {
  findById(_id: string, company_id: string): Promise<Asset>;
  findAll(company_id: string): Promise<Asset[]>;
  findPaginated(
    pagination: DomainPaginationDto,
    filters,
    company_id: string
  ): Promise<PaginatedResultInterface<Asset>>;

  formatFilters(filters: DomainFilterAssetDto);
  findByFilter(filters, company_id: string): Promise<Asset[]>;

  create(asset: DomainCreateAssetDto): Promise<Asset>;
  createMassive(assets: DomainCreateAssetDto[]): Promise<number>;
  update(_id: string, asset: DomainUpdateAssetDto): Promise<Asset>;
}
