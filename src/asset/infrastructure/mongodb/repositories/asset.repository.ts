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

  async findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<Asset>> {
    const filters = {
      name: { $regex: pagination.search, $options: "i" },
    };
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
}
