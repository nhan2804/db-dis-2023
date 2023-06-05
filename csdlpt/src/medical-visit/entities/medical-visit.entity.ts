import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MedicalVisitDocument = MedicalVisit & Document;

@Schema({ _id: false })
class PreExamination {
  @Prop()
  weight: number;
  @Prop()
  height: number;
  @Prop()
  bloodPressure: number;
}
const PreExaminationSchema = SchemaFactory.createForClass(PreExamination);
@Schema({ timestamps: true })
export class MedicalVisit {
  @Prop({ type: PreExaminationSchema })
  preExamination: PreExamination;
  @Prop()
  reason: string;
  @Prop()
  diagnosis: string;
  @Prop()
  treatment: string;
  @Prop()
  examination: string;
  @Prop()
  summary: string;
  @Prop()
  prognosis?: string;
  @Prop()
  antecedent?: string;
  @Prop()
  medicalHistory?: string;
  @Prop()
  dateTake: Date;
  @Prop()
  reasonMoveIn: string;
  @Prop()
  doctorId: string;
  @Prop()
  patientId: string;
  @Prop()
  prescriptionId: string;
  @Prop({ default: false })
  isFinish?: boolean;
}

export const MedicalVisitSchema = SchemaFactory.createForClass(MedicalVisit);
