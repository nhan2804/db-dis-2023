import { Controller, Post, Body } from '@nestjs/common';
import { BaseController } from 'src/app/controllers/base.controller';
import { SheetModel } from './entities/sheet.entity';
import { SheetsService } from './sheets.service';

@Controller('sheets')
export class SheetsController extends BaseController<SheetModel> {
  constructor(readonly service: SheetsService) {
    super(service);
  }

  @Post('/sheet')
  async create(@Body() req: SheetModel) {
    return this.service.baseCreate(req);
  }
}
