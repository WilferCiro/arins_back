import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class DependencyDocument extends Document {
  @Prop({ required: true })
  name: string;

  //@Prop({ type: Types.ObjectId, ref: 'Company' })
  //company: CompanyDocument;

  @Prop({ required: true, default: false })
  active: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const DependencySchema = SchemaFactory.createForClass(DependencyDocument);
