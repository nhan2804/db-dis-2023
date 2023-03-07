import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { Document } from 'mongoose';
import { COLUM_TYPE } from 'src/app/constants/columType.cons';
import { BaseModel } from 'src/app/models/base.schema';

export type SheetDocument = SheetModel & Document;

@Schema({ collection: 'sheets', timestamps: true })
export class SheetModel extends BaseModel {
  @IsEnum(COLUM_TYPE)
  @IsNotEmpty()
  @Prop({ required: true, default: 'TEXT' })
  type: string;
}

export const SheetSchema = SchemaFactory.createForClass(SheetModel);
