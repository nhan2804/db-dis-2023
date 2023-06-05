import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type MedicineDocument = Medicine & Document;

@Schema({ collection: 'medicines', timestamps: true })
export class Medicine {
  @Prop()
  code: string;
  @Prop()
  name: string;
  @Prop()
  price: number;
  @Prop()
  unit: string;
  @Prop()
  quantity: number;
  @Prop()
  category: number;
  @Prop()
  description?: string;
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);
