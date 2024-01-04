import { Store } from "src/store/domain/entities/store.type";

export class Product {
  _id?: string;
  name: string;
  description: string;
  barcode: string;
  price: number;
  quantity: number;
  iva: number;
  presentation: string;
  store: Store;
  store_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
