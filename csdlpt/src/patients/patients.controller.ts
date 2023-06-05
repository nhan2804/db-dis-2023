import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { MedicalRecordsService } from 'src/medical-records/medical-records.service';
import { PrescriptionsService } from 'src/prescriptions/prescriptions.service';
import { TicketsService } from 'src/tickets/tickets.service';
import { Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly medicalRecordService: MedicalRecordsService,
    private readonly prescriptionService: PrescriptionsService,
    private readonly ticketService: TicketsService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    const patient = await this.patientsService.create(createPatientDto);
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash('password', saltOrRounds);
    const user = await this.userService.createPatientUser(
      patient._id,
      patient.cccd,
      hashedPassword,
    );
    return patient;
  }

  @Get()
  findAll() {
    return this.patientsService.findAllWithoutPagination();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOneById(id);
  }
  @Get(':id/tickets')
  findOneTickets(@Param('id') id: string) {
    return this.ticketService.findAllWithoutPagination(
      {
        patientId: new Types.ObjectId(id),
      },
      undefined,
      'doctor patient prescription',
    );
  }
  @Get(':id/prescriptions')
  findOnePrescriptions(@Param('id') id: string) {
    return this.prescriptionService.findAllWithoutPagination(
      {
        patientId: new Types.ObjectId(id),
        medicineItems: { $ne: [] },
      },
      undefined,
      'doctor patient',
    );
  }
  @Get(':id/medical-records')
  findOneMedicalRecord(@Param('id') id: string) {
    return this.medicalRecordService.findAllWithoutPagination(
      {
        patientId: new Types.ObjectId(id),
      },
      undefined,
      'doctor patient prescription',
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}
