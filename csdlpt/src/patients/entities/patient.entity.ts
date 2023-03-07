import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema({ collection: 'patients', timestamps: true })
export class Patient {
  @Prop()
  code: string;
  @Prop()
  fullName: string;
  @Prop()
  sex: string;
  @Prop()
  dob: Date;
  @Prop()
  phone: string;
  @Prop()
  address: string;
  @Prop({ type: Object, default: { active: false } })
  moreInfo: {};
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
