// Nest
import { Injectable } from '@nestjs/common';

// Application
import { SellDto } from '../dto/sell.dto';

// Domain
import { Sell } from 'src/sell/domain/entities/sell.type';
import { CreateSellDto } from '../dto/sell.create.dto';
import { UpdateSellDto } from '../dto/sell.update.dto';
import { DomainCreateSellDto } from 'src/sell/domain/dto/sell.create.dto';
import { DomainUpdateSellDto } from 'src/sell/domain/dto/sell.update.dto';

// Shared

@Injectable()
export class SellMapper {
  toDomainCreate(sellDto: CreateSellDto): DomainCreateSellDto {
    const { active, name } = sellDto;
    return { active, name };
  }

  toDomainUpdate(sellDto: UpdateSellDto): DomainUpdateSellDto {
    const { active, name } = sellDto;
    return { active, name };
  }

  toDto(sell: Sell): SellDto {
    return sell as SellDto;
  }
}
