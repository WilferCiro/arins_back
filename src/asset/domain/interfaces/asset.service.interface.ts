// Nest

// Domain
import { DomainCreateAssetDto } from '../dto/asset.create.dto';
import { DomainUpdateAssetDto } from '../dto/asset.update.dto';
import { Asset } from '../entities/asset.type';

// Shared
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

export interface AssetService {
  findById(id: number): Promise<Asset>;
  findAll(): Promise<Asset[]>;
  findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Asset>>;
  create(asset: DomainCreateAssetDto): Promise<Asset>;
  update(id: number, asset: DomainUpdateAssetDto): Promise<Asset>;
}
