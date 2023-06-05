import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient, PatientDocument } from './entities/patient.entity';
import { Model } from 'mongoose';
import { AbstractService } from 'src/app/controllers/services/AbtrastService';

@Injectable()
export class PatientsService extends AbstractService<Patient> {
  constructor(
    @InjectModel(Patient.name)
    readonly model: Model<PatientDocument>,
  ) {
    super(model);
  }
}
