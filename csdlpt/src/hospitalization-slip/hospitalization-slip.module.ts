import { Module } from '@nestjs/common';
import { HospitalizationSlipService } from './hospitalization-slip.service';
import { HospitalizationSlipController } from './hospitalization-slip.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  HospitalizationSlip,
  HospitalizationSlipSchema,
} from './entities/hospitalization-slip.entity';

@Module({
  controllers: [HospitalizationSlipController],
  providers: [HospitalizationSlipService],
  imports: [
    MongooseModule.forFeature([
      {
        name: HospitalizationSlip.name,
        schema: HospitalizationSlipSchema,
      },
    ]),
  ],
})
export class HospitalizationSlipModule {}
