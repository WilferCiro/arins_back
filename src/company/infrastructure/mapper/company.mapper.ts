// Nest
import { Injectable } from "@nestjs/common";

// Application
import { CompanyDto } from "../dto/company.dto";

// Domain
import { Company } from "src/company/domain/entities/company.type";
import { CreateCompanyDto } from "../dto/company.create.dto";
import { UpdateCompanyDto } from "../dto/company.update.dto";
import { DomainCreateCompanyDto } from "src/company/domain/dto/company.create.dto";
import { DomainUpdateCompanyDto } from "src/company/domain/dto/company.update.dto";
import { SelectDto } from "src/shared/application/dto/select.dto";

// Shared

@Injectable()
export class CompanyMapper {
  toDomainCreate(companyDto: CreateCompanyDto): DomainCreateCompanyDto {
    const { active, name, nit, address, cellphone, email, webpage, type } =
      companyDto;
    return { active, name, nit, address, cellphone, email, webpage, type };
  }

  toDomainUpdate(companyDto: UpdateCompanyDto): DomainUpdateCompanyDto {
    const { active, name, nit, address, cellphone, email, webpage, type } =
      companyDto;
    return { active, name, nit, address, cellphone, email, webpage, type };
  }

  toDto(company: Company): CompanyDto {
    return company as CompanyDto;
  }

  toDtoSelect(company: Company): SelectDto {
    return {
      value: `${company._id}`,
      label: `${company.name}`,
      description: `Nit: ${company.nit}`,
    };
  }
}
