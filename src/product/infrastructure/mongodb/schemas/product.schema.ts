import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { StoreDocument } from "src/store/infrastructure/mongodb/schemas/store.schema";

@Schema({ timestamps: true })
export class ProductDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  barcode: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  iva: number;

  @Prop({ required: true })
  presentation: string;

  @Prop({ type: Types.ObjectId, ref: "Store", required: true })
  store: StoreDocument;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(ProductDocument);

ProductSchema.index({
  name: 1,
  store: 1,
  presentation: 1,
  description: 1,
  createdAt: -1,
});
