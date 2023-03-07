import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Patient } from 'src/patients/entities/patient.entity';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import { Service } from 'src/services/entities/service.entity';

export type BillDocument = Bill & Document;

@Schema({ collection: 'bills', timestamps: true })
export class Bill {
  @Prop()
  note: string;

  @Prop()
  total: number;
  @Prop({ type: SchemaTypes.ObjectId, ref: Prescription.name })
  prescriptionId: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: Patient.name })
  patientId: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: Service.name })
  serviceId: Types.ObjectId;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
