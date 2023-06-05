import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;
  @Prop({ default: 'Ngoc Nhan Default FUll Name ' + Math.random() })
  fullName: string;
  @Prop()
  ssoId: string;
  @Prop()
  ssoEmail: string;
  @Prop()
  password: string;
  @Prop()
  type?: string;
  @Prop()
  avatar: string;
  @Prop({ type: Types.ObjectId, ref: 'doctors' })
  doctorId?: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'patients' })
  patientId?: Types.ObjectId;

  @Prop({ default: Math.floor(Math.random() * 1000) })
  otp: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
