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

  private getAggregationsFilters(filters: Record<string, any>) {
    return [
      {
        $lookup: {
          from: "dependencies",
          localField: "dependency",
          foreignField: "_id",
          as: "dependency",
        },
      },
      {
        $unwind: {
          path: "$dependency",
        },
      },
      {
        $match: filters,
      },
    ];
  }

  async findAll(company_id: string): Promise<Asset[]> {
    const aggregations = this.getAggregationsFilters({
      "dependency.company": new Types.ObjectId(company_id),
    });
    const assets = await this.model.aggregate(aggregations);
    return assets;
  }

  async findById(_id: string, company_id: string): Promise<Asset> {
    const aggregations = this.getAggregationsFilters({
      _id,
      "dependency.company": new Types.ObjectId(company_id),
    });
    const register = await this.model.aggregate(aggregations);
    return register?.[0];
  }

  async findByFilter(filters, company_id: string): Promise<Asset[]> {
    const aggregations = this.getAggregationsFilters({
      ...filters,
      "dependency.company": new Types.ObjectId(company_id),
    });
    const assets = await this.model.aggregate(aggregations);
    return assets;
  }

  async findPaginated(
    pagination: DomainPaginationDto,
    filters,
    company_id: string
  ): Promise<PaginatedResultInterface<Asset>> {
    const aggregations: any = this.getAggregationsFilters({
      ...filters,
      "dependency.company": new Types.ObjectId(company_id),
    });
    const total = await this.model
      .aggregate([...aggregations, { $count: "total" }])
      .exec();
    aggregations.push(
      ...[
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $skip: pagination.page * pagination.count,
        },
        {
          $limit: +pagination.count,
        },
      ]
    );
    const data = await this.model.aggregate(aggregations);
    return { total: total[0]?.total, data };
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

  async createMassive(assets: DomainCreateAssetDto[]): Promise<number> {
    const newData = assets.map((asset) => ({
      ...asset,
      dependency: new Types.ObjectId(asset.dependency_id),
      dependency_id: undefined,
    }));
    const data = await this.model.insertMany(newData);
    return data.length;
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
            "dependency._id": {
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
