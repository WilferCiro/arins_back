import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { CompanyDocument } from "src/company/infrastructure/mongodb/schemas/company.schema";

@Schema({ timestamps: true })
export class StoreDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: "Company" })
  company: CompanyDocument;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  code: string;

  @Prop({ required: true, default: false })
  active: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const StoreSchema = SchemaFactory.createForClass(StoreDocument);

StoreSchema.index({ name: 1 });
StoreSchema.index({ company: 1 });
StoreSchema.index({ code: 1 });

StoreSchema.index({ name: 1, company: 1, code: 1, description: 1 });
