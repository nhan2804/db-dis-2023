import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema({ collection: 'services', timestamps: true })
export class Service {
  @Prop()
  code: string;
  @Prop()
  name: string;
  @Prop()
  total: number;
  @Prop()
  unit: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
