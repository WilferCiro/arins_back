export class DomainCreateSubSaleDto {
    products: {
        _id: string;
        quantity: number;
    }[];
    sale_id: string;
}