import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ProductDocument } from "src/product/infrastructure/mongodb/schemas/product.schema";
import { StoreDocument } from "src/store/infrastructure/mongodb/schemas/store.schema";

@Schema({ timestamps: true })
export class SaleDocument extends Document {
  @Prop({ required: true, default: 0 })
  initialMoney: number;

  @Prop({ type: Types.ObjectId, ref: "Store", required: true })
  store: StoreDocument;

  @Prop([
    {
      _id: { type: Types.ObjectId, auto: true },
      products: [
        {
          original: { type: Types.ObjectId, ref: "Product" },
          name: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, required: true },
          iva: { type: Number, required: true },
        },
      ],
      date: { type: Date, required: true, default: Date.now },
    },
  ])
  sales: {
    _id: Types.ObjectId;
    products: {
      original: ProductDocument;
      name: string;
      price: number;
      quantity: number;
    }[];
    date: Date;
  }[];

  @Prop([
    {
      description: { type: String, required: true },
      price: { type: Number, required: true },
      date: { type: Date, required: true, default: Date.now },
    },
  ])
  orders: {
    description: string;
    price: number;
    date: Date;
  }[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const SaleSchema = SchemaFactory.createForClass(SaleDocument);

SaleSchema.index({
  createdAt: -1,
  store: 1,
});
