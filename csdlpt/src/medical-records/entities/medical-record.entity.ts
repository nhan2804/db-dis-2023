import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import { Service } from 'src/services/entities/service.entity';

export type MedicalRecordDocument = MedicalRecord & Document;
@Schema({
  _id: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
class ServiceItem {
  @Transform(({ value }) => new Types.ObjectId(value))
  @Prop({ type: Types.ObjectId, ref: Service.name })
  serviceId: Types.ObjectId;
  @Prop()
  quantity: number;
  @Prop()
  note?: string;
  service?: Service;
}
export const ServiceItemSchema = SchemaFactory.createForClass(ServiceItem);
ServiceItemSchema.virtual('service', {
  localField: 'serviceId',
  foreignField: '_id',
  justOne: true,
  ref: Service.name,
});
@Schema({
  collection: 'medical-records',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class MedicalRecord {
  @Prop()
  code: string;

  @Prop()
  preliminaryClinicalDiagnosis: string;
  @Prop()
  diagnosis?: string;
  @Prop()
  treatment?: string;
  @Prop()
  examination?: string;
  @Prop()
  summary?: string;
  @Prop()
  prognosis?: string;
  @Prop()
  antecedent?: string;
  @Prop()
  medicalHistory?: string;
  @Prop()
  dateMoveIn: Date;
  @Prop()
  reasonMoveIn: string;
  @Prop({
    type: Object,
    default: { weight: 50, height: 10, bloodPressure: 100 },
  })
  @Prop({ type: SchemaTypes.ObjectId, ref: Doctor.name })
  doctorId: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: Patient.name })
  patientId: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: Prescription.name })
  prescriptionId: Types.ObjectId;
  @Transform(({ value }) =>
    value.map((v) => ({ ...v, serviceId: new Types.ObjectId(v?.serviceId) })),
  )
  @Prop({ type: [ServiceItemSchema] })
  serviceItems: ServiceItem[];
  doctor: Doctor;
  patient: Patient;
  prescription: Prescription;
}

export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);
MedicalRecordSchema.virtual('doctor', {
  localField: 'doctorId',
  foreignField: '_id',
  justOne: true,
  ref: Doctor.name,
});
MedicalRecordSchema.virtual('patient', {
  localField: 'patientId',
  foreignField: '_id',
  justOne: true,
  ref: Patient.name,
});
MedicalRecordSchema.virtual('prescription', {
  localField: 'prescriptionId',
  foreignField: '_id',
  justOne: true,
  ref: Prescription.name,
});
