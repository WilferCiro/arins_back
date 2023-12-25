import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class CompanyDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  nit: string;

  @Prop()
  address: string;

  @Prop()
  cellphone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  webpage: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, default: false })
  active: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(CompanyDocument);

CompanySchema.index({ name: 1 });
CompanySchema.index({ nit: 1 });
CompanySchema.index({ email: 1 });
CompanySchema.index({ webpage: 1 });
CompanySchema.index({ type: 1 });
