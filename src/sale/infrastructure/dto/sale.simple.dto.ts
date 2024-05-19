import { Store } from "src/store/domain/entities/store.type";

export interface SaleSimpleDto {
  _id?: string;

  initialMoney: number;
  finalMoney: number;
  orders: {
    total: number;
    count: number;
  },
  sales: {
    total: number;
    iva: number;
    count: number;
  }

  store: Store,
  store_id: string;

  createdAt: Date;
}
