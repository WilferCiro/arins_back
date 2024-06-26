// Nest

// Domain
import { DomainCreateAssetDto } from "../dto/asset.create.dto";
import { DomainUpdateAssetDto } from "../dto/asset.update.dto";
import { Asset } from "../entities/asset.type";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { DomainFilterAssetDto } from "../dto/assets.filter.dto";

export interface AssetService {
  findAll(): Promise<Asset[]>;
  findById(_id: string): Promise<Asset>;
  findPaginated(
    pagination: DomainPaginationDto & DomainFilterAssetDto
  ): Promise<PaginatedResultInterface<Asset>>;
  export(filters: DomainFilterAssetDto): Promise<Buffer>;
  create(asset: DomainCreateAssetDto): Promise<Asset>;
  createMassive(assets: DomainCreateAssetDto[]): Promise<number>;
  update(_id: string, asset: DomainUpdateAssetDto): Promise<Asset>;
}
