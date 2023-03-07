import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorDocument = Doctor & Document;

@Schema({ collection: 'doctors', timestamps: true })
export class Doctor {
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
  @Prop()
  position: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
