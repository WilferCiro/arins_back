import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { DependencyDocument } from "src/dependency/infrastructure/mongodb/schemas/dependency.schema";

@Schema({ timestamps: true, versionKey: false })
export class AssetDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  plate: string;

  @Prop({ required: false })
  serial: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  acquisitionDate: Date;

  @Prop({ type: Types.ObjectId, ref: "Dependency", required: true })
  dependency: DependencyDocument;

  @Prop({ required: true })
  assessment: string;

  @Prop({ required: true })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const AssetSchema = SchemaFactory.createForClass(AssetDocument);

AssetSchema.index({
  name: 1,
  dependency: 1,
  serial: 1,
  plate: 1,
  category: 1,
  createdAt: -1,
});
