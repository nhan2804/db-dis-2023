import { Injectable } from '@nestjs/common';
import { CreateHospitalizationSlipDto } from './dto/create-hospitalization-slip.dto';
import { UpdateHospitalizationSlipDto } from './dto/update-hospitalization-slip.dto';
import { AbstractService } from 'src/app/controllers/services/AbtrastService';
import {
  HospitalizationSlip,
  HospitalizationSlipDocument,
} from './entities/hospitalization-slip.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class HospitalizationSlipService extends AbstractService<HospitalizationSlip> {
  constructor(
    @InjectModel(HospitalizationSlip.name)
    readonly model: Model<HospitalizationSlipDocument>,
  ) {
    super(model);
  }
}
