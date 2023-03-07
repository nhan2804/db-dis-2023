import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Doctor } from 'src/doctors/entities/doctor.entity';

export type MedicalRecordDocument = MedicalRecord & Document;

@Schema({ collection: 'medical-records', timestamps: true })
export class MedicalRecord {
  @Prop()
  code: string;

  @Prop()
  nameDisease: string;

  @Prop({
    type: Object,
    default: { weight: 50, height: 10, bloodPressure: 100 },
  })
  @Prop({ type: SchemaTypes.ObjectId, ref: Doctor.name })
  doctorId: Types.ObjectId;
  moreIndex: {};
}

export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);
