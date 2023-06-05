import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema({ collection: 'services', timestamps: true })
export class Service {
  @Prop()
  name: string;
  @Prop()
  price: number;
  @Prop()
  unit: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
