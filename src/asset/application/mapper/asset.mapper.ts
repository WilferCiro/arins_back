// Nest
import { Injectable } from '@nestjs/common';

// Application
import { AssetDto } from '../dto/asset.dto';

// Domain
import { Asset } from 'src/asset/domain/entities/asset.type';
import { CreateAssetDto } from '../dto/asset.create.dto';
import { UpdateAssetDto } from '../dto/asset.update.dto';
import { DomainCreateAssetDto } from 'src/asset/domain/dto/asset.create.dto';
import { DomainUpdateAssetDto } from 'src/asset/domain/dto/asset.update.dto';

// Shared

@Injectable()
export class AssetMapper {
  toDomainCreate(assetDto: CreateAssetDto): DomainCreateAssetDto {
    const { active, name } = assetDto;
    return { active, name };
  }

  toDomainUpdate(assetDto: UpdateAssetDto): DomainUpdateAssetDto {
    const { active, name } = assetDto;
    return { active, name };
  }

  toDto(asset: Asset): AssetDto {
    return asset as AssetDto;
  }
}
