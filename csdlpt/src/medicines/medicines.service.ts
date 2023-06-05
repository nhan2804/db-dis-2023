import { Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { AbstractService } from 'src/app/controllers/services/AbtrastService';
import { Medicine, MedicineDocument } from './entities/medicine.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MedicinesService extends AbstractService<Medicine> {
  constructor(
    @InjectModel(Medicine.name)
    readonly model: Model<MedicineDocument>,
  ) {
    super(model);
  }
}
