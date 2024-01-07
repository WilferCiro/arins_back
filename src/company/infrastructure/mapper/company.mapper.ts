// Nest
import { Injectable } from "@nestjs/common";

// Application
import { CompanyAccessDto, CompanyDto } from "../dto/company.dto";

// Domain
import { Company } from "src/company/domain/entities/company.type";
import { CreateCompanyDto } from "../dto/company.create.dto";
import { UpdateCompanyDto } from "../dto/company.update.dto";
import { DomainCreateCompanyDto } from "src/company/domain/dto/company.create.dto";
import { DomainUpdateCompanyDto } from "src/company/domain/dto/company.update.dto";
import { SelectDto } from "src/shared/application/dto/select.dto";
import * as dayjs from "dayjs";

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
    return { ...company, access: this.toDtoAccess(company) } as CompanyDto;
  }

  toDtoAccess(company: Company): CompanyAccessDto {
    const { access } = company;
    return {
      inventory: {
        ...access.inventory,
        active:
          access?.inventory?.expiration &&
          dayjs().isBefore(dayjs(access?.inventory?.expiration)),
      },
      sales: {
        ...access.sales,
        active:
          access?.sales?.expiration &&
          dayjs().isBefore(dayjs(access?.sales?.expiration)),
      },
      entry: {
        ...access.entry,
        active:
          access?.entry?.expiration &&
          dayjs().isBefore(dayjs(access?.entry?.expiration)),
      },
    };
  }

  toDtoSelect(company: Company): SelectDto {
    return {
      value: `${company._id}`,
      label: `${company.name}`,
      description: `Nit: ${company.nit}`,
    };
  }
}
