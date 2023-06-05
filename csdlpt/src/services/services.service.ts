import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractService } from 'src/app/controllers/services/AbtrastService';
import { Service, ServiceDocument } from './entities/service.entity';

@Injectable()
export class ServicesService extends AbstractService<Service> {
  constructor(
    @InjectModel(Service.name)
    readonly model: Model<ServiceDocument>,
  ) {
    super(model);
  }
}
