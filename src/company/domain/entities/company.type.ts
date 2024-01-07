import { User } from "src/user/domain/entities/user.type";

export class CompanyAccess {
  inventory?: {
    price: number;
    expiration: Date;
  };
  sales?: {
    price: number;
    expiration: Date;
  };
  entry?: {
    price: number;
    expiration: Date;
  };
}

export class Company {
  _id?: string;
  name: string;
  nit: string;
  address: string;
  cellphone: string;
  email: string;
  webpage: string;
  type: string;
  active: boolean;
  admin: User;
  createdAt?: Date;
  updatedAt?: Date;
  access?: CompanyAccess;
}
