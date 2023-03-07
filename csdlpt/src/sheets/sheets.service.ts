import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/app/controllers/services/base.service';
import { SheetDocument, SheetModel } from './entities/sheet.entity';

@Injectable()
export class SheetsService extends BaseService<SheetModel> {
  constructor(
    @InjectModel(SheetModel.name)
    readonly model: Model<SheetDocument>,
  ) {
    super(model);
  }
}
