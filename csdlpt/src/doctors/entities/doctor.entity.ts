import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, Types } from 'mongoose';
import { Department } from 'src/departments/entities/department.entity';

export type DoctorDocument = Doctor & Document;

@Schema({
  collection: 'doctors',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Doctor {
  @Prop()
  code: string;
  @Prop()
  fullName: string;
  @Prop()
  sex: string;
  @Prop()
  cccd: string;
  @Prop()
  dob: Date;
  @Prop()
  phone: string;
  @Prop()
  address: string;
  @Prop()
  position: string;
  @Transform(({ value }) => new Types.ObjectId(value))
  @Prop({ type: Types.ObjectId, ref: Department.name })
  departmentId: Types.ObjectId;
  department?: Department;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
DoctorSchema.virtual('department', {
  localField: 'departmentId',
  foreignField: '_id',
  justOne: true,
  ref: Department.name,
});
