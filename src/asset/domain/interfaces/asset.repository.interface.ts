// Nest

// Domain
import { DomainCreateAssetDto } from "../dto/asset.create.dto";
import { DomainUpdateAssetDto } from "../dto/asset.update.dto";
import { Asset } from "../entities/asset.type";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";

export interface AssetRepository {
  findById(_id: string): Promise<Asset>;
  findAll(): Promise<Asset[]>;
  findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<Asset>>;

  create(asset: DomainCreateAssetDto): Promise<Asset>;
  update(_id: string, asset: DomainUpdateAssetDto): Promise<Asset>;
}
