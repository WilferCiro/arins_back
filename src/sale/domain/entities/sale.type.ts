import { Product } from "src/product/domain/entities/product.type";
import { Store } from "src/store/domain/entities/store.type";

export class Sale {
  _id?: string;

  initialMoney: number;
  sales: {
    _id?: string;
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

  store: Store;

  createdAt?: Date;
}
