import { Module } from '@nestjs/common';
import { MedicalVisitService } from './medical-visit.service';
import { MedicalVisitController } from './medical-visit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MedicalVisit,
  MedicalVisitSchema,
} from './entities/medical-visit.entity';

@Module({
  controllers: [MedicalVisitController],
  providers: [MedicalVisitService],
  imports: [
    MongooseModule.forFeature([
      { name: MedicalVisit.name, schema: MedicalVisitSchema },
    ]),
  ],
})
export class MedicalVisitModule {}
