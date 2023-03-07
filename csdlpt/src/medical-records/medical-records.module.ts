import { Module } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { MedicalRecordsController } from './medical-records.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalRecordSchema } from './entities/medical-record.entity';

@Module({
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: MedicalRecordsModule.name,
        schema: MedicalRecordSchema,
      },
    ]),
  ],
})
export class MedicalRecordsModule {}
