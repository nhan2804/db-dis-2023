import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Department, DepartmentDocument } from './entities/department.entity';
import { BaseService } from 'src/app/controllers/services/base.service';
import { Model } from 'mongoose';
import { AbstractService } from 'src/app/controllers/services/AbtrastService';
@Injectable()
export class DepartmentsService extends AbstractService<Department> {
  constructor(
    @InjectModel(Department.name)
    readonly model: Model<DepartmentDocument>,
  ) {
    super(model);
  }
}
