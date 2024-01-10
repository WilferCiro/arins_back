export class DomainCreateCompanyDto {
  name: string;
  nit: string;
  address: string;
  cellphone: string;
  email: string;
  webpage: string;
  type: string;
  active?: boolean;
  user_id?: string;
  access?: {
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
}
