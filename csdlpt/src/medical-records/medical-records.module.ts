import { Module } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { MedicalRecordsController } from './medical-records.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MedicalRecord,
  MedicalRecordSchema,
} from './entities/medical-record.entity';
import { PrescriptionsModule } from 'src/prescriptions/prescriptions.module';

@Module({
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: MedicalRecord.name,
        schema: MedicalRecordSchema,
      },
    ]),
    PrescriptionsModule,
  ],
  exports: [MedicalRecordsService],
})
export class MedicalRecordsModule {}
