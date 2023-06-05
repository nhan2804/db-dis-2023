import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { BaseService } from 'src/app/controllers/services/base.service';
import { Doctor, DoctorDocument } from './entities/doctor.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from 'src/app/controllers/services/AbtrastService';

@Injectable()
export class DoctorsService extends AbstractService<Doctor> {
  constructor(
    @InjectModel(Doctor.name)
    readonly model: Model<DoctorDocument>,
  ) {
    super(model);
  }
}
