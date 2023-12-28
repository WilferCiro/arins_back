import { User } from "src/user/domain/entities/user.type";

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
}
