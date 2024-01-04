import { Product } from "src/product/domain/entities/product.type";

export class Sale {
  _id?: string;

  initialMoney: number;
  sales: {
    products: {
      original: Product;
      original_id: string;
      name: string;
      price: number;
      quantity: number;
      iva: number;
    }[];
    date: Date;
  }[];
  orders: {
    description: string;
    price: number;
    date: Date;
  }[];

  createdAt?: Date;
}
