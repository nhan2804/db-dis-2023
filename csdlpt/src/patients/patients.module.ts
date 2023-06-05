import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './entities/patient.entity';
import { PrescriptionsModule } from 'src/prescriptions/prescriptions.module';
import { TicketsModule } from 'src/tickets/tickets.module';
import { MedicalRecordsModule } from 'src/medical-records/medical-records.module';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Patient.name,
        schema: PatientSchema,
      },
    ]),
    PrescriptionsModule,
    TicketsModule,
    MedicalRecordsModule,
    UsersModule,
  ],
})
export class PatientsModule {}
