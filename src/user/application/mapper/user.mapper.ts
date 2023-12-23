// Nest
import { Injectable } from '@nestjs/common';

// Application
import { UserDto } from '../dto/user.dto';

// Domain
import { User } from 'src/user/domain/entities/user.type';
import { CreateUserDto } from '../dto/user.create.dto';
import { UpdateUserDto } from '../dto/user.update.dto';
import { DomainCreateUserDto } from 'src/user/domain/dto/user.create.dto';
import { DomainUpdateUserDto } from 'src/user/domain/dto/user.update.dto';

// Shared

@Injectable()
export class UserMapper {
  toDomainCreate(userDto: CreateUserDto): DomainCreateUserDto {
    const { active, name } = userDto;
    return { active, name };
  }

  toDomainUpdate(userDto: UpdateUserDto): DomainUpdateUserDto {
    const { active, name } = userDto;
    return { active, name };
  }

  toDto(user: User): UserDto {
    return user as UserDto;
  }
}
