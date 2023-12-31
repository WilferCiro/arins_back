// Nestjs
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

// Infraestructure

// Application

// Domain
import { User } from "../../../domain/entities/user.type";
import { UserRepository } from "../../../domain/interfaces/user.repository.interface";
import { DomainCreateUserDto } from "src/user/domain/dto/user.create.dto";
import { DomainUpdateUserDto } from "src/user/domain/dto/user.update.dto";

// Shared
import { DomainPaginationDto } from "src/shared/domain/dto/pagination.dto";
import { PaginatedResultInterface } from "src/shared/application/interfaces/paginated.result.interface";
import { UserMapper } from "../../mapper/user.mapper";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  private mapper: UserMapper;
  constructor(@InjectModel("User") private readonly model: Model<User>) {
    this.mapper = new UserMapper();
  }

  async findAll(): Promise<User[]> {
    const users = await this.model.find().lean();
    return users;
  }

  async findById(_id: string): Promise<User> {
    const register = await this.model.findById(_id).lean();
    return register;
  }

  async findByEmail(email: string): Promise<User> {
    const register = await this.model.find({ email }).lean();
    if (!register) {
      return null;
    }
    return register[0];
  }

  async findPaginated(
    pagination: DomainPaginationDto
  ): Promise<PaginatedResultInterface<User>> {
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

  async create(user: DomainCreateUserDto): Promise<User> {
    const created = new this.model(user);
    return await created.save();
  }

  async update(_id: string, user: DomainUpdateUserDto): Promise<User> {
    return await this.model.findByIdAndUpdate(_id, user, { new: true }).exec();
  }
}
