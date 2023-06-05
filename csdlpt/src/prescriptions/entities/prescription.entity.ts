import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Medicine } from 'src/medicines/entities/medicine.entity';
import { Patient } from 'src/patients/entities/patient.entity';

export type PrescriptionDocument = Prescription & Document;

@Schema({
  _id: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class MedicineItem {
  @Prop({ type: Types.ObjectId, ref: Medicine.name })
  medicineId: Types.ObjectId;

  @Prop()
  quantity: number;
  @Prop()
  note?: string;
  medicine?: Medicine;
}
export const MedicineItemSchema = SchemaFactory.createForClass(MedicineItem);
MedicineItemSchema.virtual('medicine', {
  localField: 'medicineId',
  foreignField: '_id',
  justOne: true,
  ref: Medicine.name,
});
@Schema({
  collection: 'prescriptions',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Prescription {
  @Prop({ type: [MedicineItemSchema] })
  medicineItems: MedicineItem[];
  @Prop({ type: SchemaTypes.ObjectId, ref: Doctor.name })
  doctorId: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: Patient.name })
  patientId: Types.ObjectId;
  doctor?: Doctor;
  patient?: Patient;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
PrescriptionSchema.virtual('doctor', {
  localField: 'doctorId',
  foreignField: '_id',
  justOne: true,
  ref: Doctor.name,
});
PrescriptionSchema.virtual('patient', {
  localField: 'patientId',
  foreignField: '_id',
  justOne: true,
  ref: Patient.name,
});
