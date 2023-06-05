import { Injectable } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { AbstractService } from 'src/app/controllers/services/AbtrastService';
import {
  MedicalRecord,
  MedicalRecordDocument,
} from './entities/medical-record.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MedicalRecordsService extends AbstractService<MedicalRecord> {
  constructor(
    @InjectModel(MedicalRecord.name)
    readonly model: Model<MedicalRecordDocument>,
  ) {
    super(model);
  }
}
