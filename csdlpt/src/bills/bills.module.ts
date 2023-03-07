import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BillSchema } from './entities/bill.entity';

@Module({
  controllers: [BillsController],
  providers: [BillsService],
  imports: [
    MongooseModule.forFeature([{ name: BillsModule.name, schema: BillSchema }]),
  ],
})
export class BillsModule {}
