import { Injectable } from '@nestjs/common';
import { CreateMedicalVisitDto } from './dto/create-medical-visit.dto';
import { UpdateMedicalVisitDto } from './dto/update-medical-visit.dto';
import { AbstractService } from 'src/app/controllers/services/AbtrastService';
import {
  MedicalVisit,
  MedicalVisitDocument,
} from './entities/medical-visit.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MedicalVisitService extends AbstractService<MedicalVisit> {
  constructor(
    @InjectModel(MedicalVisit.name)
    readonly model: Model<MedicalVisitDocument>,
  ) {
    super(model);
  }
}
