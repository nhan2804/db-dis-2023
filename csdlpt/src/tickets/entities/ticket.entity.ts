import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
export type TicketDocument = Ticket & Document;
@Schema({ collection: 'tickets', timestamps: true })
export class Ticket {
  @Prop()
  code: string;
  @Prop()
  fullName: string;
  @Prop()
  symptom: string;
  @Prop()
  dob: Date;
  @Prop()
  confirm: string;
  note: string;
  @Prop()
  treatmentDirection: string;
  @Prop({ type: Object, default: { active: false } })
  moreInfo: {};

  @Prop({ type: SchemaTypes.ObjectId, ref: Doctor.name })
  idDoctor: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: Patient.name })
  idPatient: Types.ObjectId;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
