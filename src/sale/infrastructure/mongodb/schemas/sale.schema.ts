import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { ProductDocument } from "src/product/infrastructure/mongodb/schemas/product.schema";

@Schema({ timestamps: true })
export class SaleDocument extends Document {
  @Prop({ required: true, default: 0 })
  initialMoney: number;

  @Prop([
    {
      products: [
        {
          original: { type: Types.ObjectId, ref: "Product" },
          name: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, required: true },
        },
      ],
      date: { type: Date, required: true, default: Date.now },
    },
  ])
  sales: {
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