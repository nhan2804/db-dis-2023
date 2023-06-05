import { Module } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsController } from './prescriptions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Prescription,
  PrescriptionSchema,
} from './entities/prescription.entity';

@Module({
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Prescription.name,
        schema: PrescriptionSchema,
      },
    ]),
  ],
  exports: [PrescriptionsService],
})
export class PrescriptionsModule {}
