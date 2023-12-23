// Nest
import { Inject, Injectable } from '@nestjs/common';

// Application

// Domain
import { Asset } from 'src/asset/domain/entities/asset.type';
import { AssetRepository } from 'src/asset/domain/interfaces/asset.repository.interface';
import { AssetService } from 'src/asset/domain/interfaces/asset.service.interface';
import { DomainPaginationDto } from 'src/shared/domain/dto/pagination.dto';
import { DomainCreateAssetDto } from 'src/asset/domain/dto/asset.create.dto';
import { DomainUpdateAssetDto } from 'src/asset/domain/dto/asset.update.dto';

// Shared
import { PaginatedResultInterface } from 'src/shared/application/interfaces/paginated.result.interface';

@Injectable()
export class AssetServiceImpl implements AssetService {
  constructor(
    @Inject('AssetRepository')
    private readonly repository: AssetRepository,
  ) {}

  async findAll(): Promise<Asset[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<Asset> {
    return await this.repository.findById(id);
  }

  async findPaginated(
    pagination: DomainPaginationDto,
  ): Promise<PaginatedResultInterface<Asset>> {
    return await this.repository.findPaginated(pagination);
  }

  async create(asset: DomainCreateAssetDto): Promise<Asset> {
    return await this.repository.create(asset);
  }

  async update(id: number, asset: DomainUpdateAssetDto): Promise<Asset> {
    return await this.repository.update(id, asset);
  }
}
