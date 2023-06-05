import { Injectable } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Prescription,
  PrescriptionDocument,
} from './entities/prescription.entity';
import { Model } from 'mongoose';
import { AbstractService } from 'src/app/controllers/services/AbtrastService';

@Injectable()
export class PrescriptionsService extends AbstractService<Prescription> {
  constructor(
    @InjectModel(Prescription.name)
    readonly model: Model<PrescriptionDocument>,
  ) {
    super(model);
  }
}
