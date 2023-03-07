import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SheetModel, SheetSchema } from './entities/sheet.entity';
import { SheetsController } from './sheets.controller';
import { SheetsService } from './sheets.service';

@Module({
  controllers: [SheetsController],
  providers: [SheetsService],
  imports: [
    MongooseModule.forFeature([{ name: SheetModel.name, schema: SheetSchema }]),
  ],
})
export class SheetsModule {}
