import { Product } from "src/product/domain/entities/product.type";
import { Store } from "src/store/domain/entities/store.type";

export interface SaleDto {
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

  store: Store,
  store_id: string;

  createdAt: Date;
}
