import { StoreDto } from "src/store/infrastructure/dto/store.dto";

export interface ProductDto {
  id?: number;
  name: string;
  description: string;
  barcode: string;
  price: number;
  quantity: number;
  iva: number;
  presentation: string;
  store: StoreDto;
  store_id: string;
  createdAt: Date;
  updatedAt: Date;
}
