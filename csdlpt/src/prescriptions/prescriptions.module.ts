import { Module } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsController } from './prescriptions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PrescriptionSchema } from './entities/prescription.entity';

@Module({
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: PrescriptionsModule.name,
        schema: PrescriptionSchema,
      },
    ]),
  ],
})
export class PrescriptionsModule {}
