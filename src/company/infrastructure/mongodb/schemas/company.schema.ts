import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { UserDocument } from "src/user/infrastructure/mongodb/schemas/user.schema";

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

  @Prop({ type: Types.ObjectId, ref: "User" })
  admin: UserDocument;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({
    type: {
      inventory: {
        price: Number,
        expiration: Date,
      },
      sales: {
        price: Number,
        expiration: Date,
      },
      entry: {
        price: Number,
        expiration: Date,
      },
    },
    default: {},
  })
  access?: {
    inventory?: {
      price: number;
      expiration: Date;
    };
    sales?: {
      price: number;
      expiration: Date;
    };
    entry?: {
      price: number;
      expiration: Date;
    };
  };
}

export const CompanySchema = SchemaFactory.createForClass(CompanyDocument);

CompanySchema.index({ name: 1 });
CompanySchema.index({ nit: 1 });
CompanySchema.index({ email: 1 });
CompanySchema.index({ webpage: 1 });
CompanySchema.index({ type: 1 });
