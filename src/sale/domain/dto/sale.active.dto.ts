export class DomainActiveSaleDto {
  store: {
    _id: string;
    name: string;
  };
  active: boolean;
  sale?: string;
}
