// Nest
import { Injectable } from '@nestjs/common';

// Application
import { DependencyDto } from '../dto/dependency.dto';

// Domain
import { Dependency } from 'src/dependency/domain/entities/dependency.type';
import { CreateDependencyDto } from '../dto/dependency.create.dto';
import { UpdateDependencyDto } from '../dto/dependency.update.dto';
import { DomainCreateDependencyDto } from 'src/dependency/domain/dto/dependency.create.dto';
import { DomainUpdateDependencyDto } from 'src/dependency/domain/dto/dependency.update.dto';

// Shared

@Injectable()
export class DependencyMapper {
  toDomainCreate(dependencyDto: CreateDependencyDto): DomainCreateDependencyDto {
    const { active, name } = dependencyDto;
    return { active, name };
  }

  toDomainUpdate(dependencyDto: UpdateDependencyDto): DomainUpdateDependencyDto {
    const { active, name } = dependencyDto;
    return { active, name };
  }

  toDto(dependency: Dependency): DependencyDto {
    return dependency as DependencyDto;
  }
}
