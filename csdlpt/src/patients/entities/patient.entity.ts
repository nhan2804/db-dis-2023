import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema({ collection: 'patients', timestamps: true })
export class Patient {
  @Prop()
  fullName: string;
  @Prop()
  sex: string;
  @Prop()
  dob: Date;
  @Prop()
  phone: string;
  @Prop()
  cccd: string;
  @Prop()
  address: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
