// Nestjs
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// Infraestructure

// Application

// Domain
import { UserEntry } from "../../../domain/entities/userEntry.type";
import { UserEntryRepository } from "../../../domain/interfaces/userEntry.repository.interface";
import { DomainCreateUserEntryDto } from "src/userEntry/domain/dto/userEntry.create.dto";
import { DomainUpdateUserEntryDto } from "src/userEntry/domain/dto/userEntry.update.dto";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { UserEntryMapper } from "../../mapper/userEntry.mapper";

@Injectable()
export class UserEntryRepositoryImpl implements UserEntryRepository {
  constructor(@InjectModel("UserEntry") private readonly model: Model<UserEntry>) {
  }

  async findAll(): Promise<UserEntry[]> {
    const UserEntries = await this.model.find().lean();
    return UserEntries;
  }

  async findById(_id: string): Promise<UserEntry> {
    const register = await this.model.findById(_id).lean();
    return register;
  }

  async findByEmail(email: string): Promise<UserEntry> {
    const register = await this.model.find({ email }).lean();
    if (!register) {
      return null;
    }
    return register[0];
  }

  async findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<UserEntry>> {
    let filters = {};
    if (pagination.search || pagination.search !== "") {
      filters = {
        $or: [
          { firstName: { $regex: pagination.search, $options: "i" } },
          { lastName: { $regex: pagination.search, $options: "i" } },
        ],
      };
    }
    const total = await this.model.find(filters).countDocuments();
    const data = await this.model
      .find(filters)
      .skip(pagination.page * pagination.count)
      .limit(pagination.count)
      .lean();
    return { total, data };
  }

  async create(userEntry: DomainCreateUserEntryDto): Promise<UserEntry> {
    const created = new this.model(userEntry);
    return await created.save();
  }

  async update(_id: string, userEntry: DomainUpdateUserEntryDto): Promise<UserEntry> {
    return await this.model.findByIdAndUpdate(_id, userEntry, { new: true }).exec();
  }
}
