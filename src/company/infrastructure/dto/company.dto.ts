export interface CompanyDto {
  _id?: string;
  name: string;
  nit: string;
  address: string;
  cellphone: string;
  email: string;
  webpage: string;
  type: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
