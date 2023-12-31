// Nest
import { Injectable } from "@nestjs/common";

// Application
import { AssetDto } from "../dto/asset.dto";

// Domain
import { Asset } from "src/asset/domain/entities/asset.type";
import { CreateAssetDto } from "../dto/asset.create.dto";
import { UpdateAssetDto } from "../dto/asset.update.dto";
import { DomainCreateAssetDto } from "src/asset/domain/dto/asset.create.dto";
import { DomainUpdateAssetDto } from "src/asset/domain/dto/asset.update.dto";
import { DependencyMapper } from "src/dependency/infrastructure/mapper/dependency.mapper";
import { FilterAssetDto } from "../dto/asset.filter.dto";
import { DomainFilterAssetDto } from "src/asset/domain/dto/assets.filter.dto";
import { formatArrayString } from "src/shared/application/helpers/formatArrayString";

// Shared

@Injectable()
export class AssetMapper {
  toDomainCreate(assetDto: CreateAssetDto): DomainCreateAssetDto {
    const {
      name,
      description,
      plate,
      serial,
      category,
      price,
      acquisitionDate,
      dependency_id,
      assessment,
      status,
    } = assetDto;
    return {
      name,
      description,
      plate,
      serial,
      category,
      price,
      acquisitionDate,
      dependency_id,
      assessment,
      status,
    };
  }

  toDomainUpdate(assetDto: UpdateAssetDto): DomainUpdateAssetDto {
    const {
      name,
      description,
      plate,
      serial,
      category,
      price,
      acquisitionDate,
      dependency_id,
      assessment,
      status,
    } = assetDto;
    return {
      name,
      description,
      plate,
      serial,
      category,
      price,
      acquisitionDate,
      dependency_id,
      assessment,
      status,
    };
  }

  toDomainFilters(filtersDto: FilterAssetDto): DomainFilterAssetDto {
    const { search, category, dependency_id, assessment, status } = filtersDto;
    return {
      search: search ? search : undefined,
      category: formatArrayString(category),
      dependency_id: formatArrayString(dependency_id),
      assessment: formatArrayString(assessment),
      status: formatArrayString(status),
    };
  }

  toDto(asset: Asset): AssetDto {
    return {
      ...asset,
      dependency_id: asset.dependency?._id,
    } as AssetDto;
  }
}
