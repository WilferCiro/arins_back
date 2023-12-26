// Nest
import { Injectable } from "@nestjs/common";

// Application
import { StoreDto } from "../dto/store.dto";

// Domain
import { Store } from "src/store/domain/entities/store.type";
import { CreateStoreDto } from "../dto/store.create.dto";
import { UpdateStoreDto } from "../dto/store.update.dto";
import { DomainCreateStoreDto } from "src/store/domain/dto/store.create.dto";
import { DomainUpdateStoreDto } from "src/store/domain/dto/store.update.dto";
import { SelectDto } from "src/shared/application/dto/select.dto";

// Shared

@Injectable()
export class StoreMapper {
  toDomainCreate(storeDto: CreateStoreDto): DomainCreateStoreDto {
    const { active, name, description, code, company_id } = storeDto;
    return { active, name, description, code, company_id };
  }

  toDomainUpdate(storeDto: UpdateStoreDto): DomainUpdateStoreDto {
    const { active, name, description, code } = storeDto;
    return { active, name, description, code };
  }

  toDto(store: Store): StoreDto {
    return {
      ...store,
      company_id: store?.company?._id,
    } as StoreDto;
  }

  toDtoSelect(store: Store): SelectDto {
    return {
      value: `${store._id}`,
      label: `${store.name}`,
    };
  }
}
