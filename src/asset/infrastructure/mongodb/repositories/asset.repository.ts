// Nestjs
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

// Infraestructure

// Application

// Domain
import { Asset } from "../../../domain/entities/asset.type";
import { AssetRepository } from "../../../domain/interfaces/asset.repository.interface";
import { DomainCreateAssetDto } from "src/asset/domain/dto/asset.create.dto";
import { DomainUpdateAssetDto } from "src/asset/domain/dto/asset.update.dto";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { DomainFilterAssetDto } from "src/asset/domain/dto/assets.filter.dto";

@Injectable()
export class AssetRepositoryImpl implements AssetRepository {
  constructor(@InjectModel("Asset") private readonly model: Model<Asset>) {}

  async findAll(): Promise<Asset[]> {
    const assets = await this.model.find().lean();
    return assets;
  }

  async findById(_id: string): Promise<Asset> {
    const register = await this.model.findById(_id).lean();
    return register;
  }
  async findByFilter(filter): Promise<Asset[]> {
    const assets = await this.model.find(filter).lean();
    return assets;
  }

  async findPaginated(
    pagination: DomainPaginationDto,
    filters
  ): Promise<PaginatedResultInterface<Asset>> {
    const total = await this.model.find(filters).countDocuments();
    const data = await this.model
      .find(filters)
      .skip(pagination.page * pagination.count)
      .limit(pagination.count)
      .populate({
        path: "dependency",
        select: "name _id",
      })
      .lean();
    return { total, data };
  }

  async create(asset: DomainCreateAssetDto): Promise<Asset> {
    const newData = {
      ...asset,
      dependency: new Types.ObjectId(asset.dependency_id),
      dependency_id: undefined,
    };
    const created = new this.model(newData);
    return await created.save();
  }

  async update(_id: string, asset: DomainUpdateAssetDto): Promise<Asset> {
    const newData = {
      ...asset,
      ...(asset.dependency_id
        ? { dependency: new Types.ObjectId(asset.dependency_id) }
        : {}),
      dependency_id: undefined,
    };
    return await this.model
      .findByIdAndUpdate(_id, newData, { new: true })
      .exec();
  }

  // Filters
  formatFilters(filters: DomainFilterAssetDto) {
    let orConditions = [];
    if (filters.search) {
      orConditions = [
        { name: { $regex: filters.search, $options: "i" } },
        { plate: { $regex: filters.search, $options: "i" } },
        {
          description: { $regex: filters.search, $options: "i" },
        },
        { serial: { $regex: filters.search, $options: "i" } },
      ];
    }
    const andConditions = {
      ...(filters.dependency_id
        ? {
            dependency: {
              $in: filters.dependency_id.map((id) => new Types.ObjectId(id)),
            },
          }
        : {}),
      ...(filters.category
        ? {
            category: { $in: filters.category },
          }
        : {}),
      ...(filters.assessment
        ? {
            assessment: { $in: filters.assessment },
          }
        : {}),
      ...(filters.status
        ? {
            status: { $in: filters.status },
          }
        : {}),
    };
    return {
      ...(orConditions.length > 0 ? { $or: orConditions } : {}),
      ...andConditions,
    };
  }
}
