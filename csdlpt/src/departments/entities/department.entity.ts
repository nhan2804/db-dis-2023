import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type DepartmentDocument = Department & Document;

@Schema({ collection: 'departments', timestamps: true })
export class Department {
  @Prop()
  code: string;
  @Prop()
  name: string;
  @Prop()
  foundedYear: Date;
  @Prop()
  leader: string;
  @Prop()
  email: string;

  //   @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  //   owner: Types.ObjectId;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
