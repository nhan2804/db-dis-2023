import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import { Service } from 'src/services/entities/service.entity';
export type TicketDocument = Ticket & Document;
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
@Schema({ _id: false })
class GreettingInfo {
  @Prop()
  weight: number;
  @Prop()
  pulse: number;
  @Prop()
  bloodPressure: string;
  @Prop()
  temperature: number;
}
const GreettingInfoSchema = SchemaFactory.createForClass(GreettingInfo);
@Schema({
  collection: 'tickets',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Ticket {
  @Prop()
  clinical?: string;
  @Prop()
  note?: string;
  @Prop()
  mainDisease?: string;
  @Prop()
  secondaryDisease?: string;

  @Prop({ type: GreettingInfoSchema })
  greettingInfo?: GreettingInfo;
  @Prop({ default: false })
  isFinish?: boolean;

  @Prop()
  dateVisit: Date;
  @Prop()
  dateReVisit?: Date;
  @Transform(({ value }) => new Types.ObjectId(value))
  @Prop({ type: Types.ObjectId, ref: Doctor.name })
  doctorId: Types.ObjectId;
  @Transform(({ value }) => new Types.ObjectId(value))
  @Prop({ type: Types.ObjectId, ref: Patient.name })
  patientId: Types.ObjectId;
  @Transform(({ value }) => new Types.ObjectId(value))
  @Prop({ type: Types.ObjectId, ref: Prescription.name })
  prescriptionId: Types.ObjectId;
  @Prop({ type: [ServiceItemSchema] })
  serviceItems: ServiceItem[];
  doctor?: Doctor;
  patient?: Patient;
  prescription: Prescription;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

TicketSchema.virtual('doctor', {
  localField: 'doctorId',
  foreignField: '_id',
  justOne: true,
  ref: Doctor.name,
});
TicketSchema.virtual('patient', {
  localField: 'patientId',
  foreignField: '_id',
  justOne: true,
  ref: Patient.name,
});
TicketSchema.virtual('prescription', {
  localField: 'prescriptionId',
  foreignField: '_id',
  justOne: true,
  ref: Prescription.name,
});
