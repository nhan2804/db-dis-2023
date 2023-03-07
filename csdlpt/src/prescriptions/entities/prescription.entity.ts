import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Doctor } from 'src/doctors/entities/doctor.entity';

export type PrescriptionDocument = Prescription & Document;

@Schema({ collection: 'prescriptions', timestamps: true })
export class Prescription {
  @Prop()
  code: string;
  @Prop()
  name: string;
  @Prop()
  prescriptionDate: Date;
  @Prop()
  quantity: number;
  @Prop({ type: SchemaTypes.ObjectId, ref: Doctor.name })
  doctorId: Types.ObjectId;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
