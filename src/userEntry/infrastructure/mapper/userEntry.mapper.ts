// Nest
import { Injectable } from "@nestjs/common";

// Application
import { UserEntryDto } from "../dto/userEntry.dto";

// Domain
import { UserEntry } from "src/userEntry/domain/entities/userEntry.type";
import { CreateUserEntryDto } from "../dto/userEntry.create.dto";
import { UpdateUserEntryDto } from "../dto/userEntry.update.dto";
import { DomainCreateUserEntryDto } from "src/userEntry/domain/dto/userEntry.create.dto";
import { DomainUpdateUserEntryDto } from "src/userEntry/domain/dto/userEntry.update.dto";

// Shared

@Injectable()
export class UserEntryMapper {
  toDomainCreate(userEntryDto: CreateUserEntryDto): DomainCreateUserEntryDto {
    const { active, firstName, lastName, email } = userEntryDto;
    return { active, firstName, lastName, email };
  }

  toDomainUpdate(userEntryDto: UpdateUserEntryDto): DomainUpdateUserEntryDto {
    const { active, firstName, lastName, email } = userEntryDto;
    return { active, firstName, lastName, email };
  }

  toDto(userEntry: UserEntry): UserEntryDto {
    return userEntry as UserEntryDto;
  }
}
