// Nest
import { Injectable } from "@nestjs/common";

// Application
import { DependencyDto } from "../dto/dependency.dto";

// Domain
import { Dependency } from "src/dependency/domain/entities/dependency.type";
import { CreateDependencyDto } from "../dto/dependency.create.dto";
import { UpdateDependencyDto } from "../dto/dependency.update.dto";
import { DomainCreateDependencyDto } from "src/dependency/domain/dto/dependency.create.dto";
import { DomainUpdateDependencyDto } from "src/dependency/domain/dto/dependency.update.dto";
import { SelectDto } from "src/shared/application/dto/select.dto";

// Shared

@Injectable()
export class DependencyMapper {
  toDomainCreate(
    dependencyDto: CreateDependencyDto
  ): DomainCreateDependencyDto {
    const { active, name, description, code, company_id } = dependencyDto;
    return { active, name, description, code, company_id };
  }

  toDomainUpdate(
    dependencyDto: UpdateDependencyDto
  ): DomainUpdateDependencyDto {
    const { active, name, description, code } = dependencyDto;
    return { active, name, description, code };
  }

  toDto(dependency: Dependency): DependencyDto {
    return dependency as DependencyDto;
  }

  toDtoSelect(dependency: Dependency): SelectDto {
    return {
      value: `${dependency._id}`,
      label: `${dependency.name}`,
    };
  }
}
