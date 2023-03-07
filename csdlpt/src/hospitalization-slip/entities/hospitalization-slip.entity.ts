import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Department } from 'src/departments/entities/department.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';

export type HospitalizationSlipDocument = HospitalizationSlip & Document;

@Schema({ collection: 'hospitalization-slips', timestamps: true })
export class HospitalizationSlip {
  @Prop()
  code: string;
  @Prop()
  dateHospitalizationDate: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: Doctor.name })
  doctorId: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: Department.name })
  departmentId: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: Ticket.name })
  ticketId: Types.ObjectId;
}

export const HospitalizationSlipSchema =
  SchemaFactory.createForClass(HospitalizationSlip);
