import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientSchema } from './entities/patient.entity';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: PatientsModule.name,
        schema: PatientSchema,
      },
    ]),
  ],
})
export class PatientsModule {}
