import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { PrescriptionsService } from 'src/prescriptions/prescriptions.service';
import { Types } from 'mongoose';
import { UserLoggin } from 'src/auth/decorators/user';

@Controller('medical-records')
export class MedicalRecordsController {
  constructor(
    private readonly medicalRecordsService: MedicalRecordsService,
    private readonly prescriptionService: PrescriptionsService,
  ) {}

  @Post()
  async create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    const { medicineItems = [], ...ticket } = createMedicalRecordDto;
    const pres = await this.prescriptionService.create({
      medicineItems: medicineItems?.map((item) => ({
        ...item,
        medicineId: new Types.ObjectId(item.medicineId),
      })),
      doctorId: ticket.doctorId,
      patientId: ticket.patientId,
    });
    return await this.medicalRecordsService.create({
      ...createMedicalRecordDto,
      prescriptionId: pres._id,
    });
  }

  @Get()
  findAll() {
    return this.medicalRecordsService.findAllWithoutPagination(
      undefined,
      undefined,
      [
        { path: 'doctor' },
        { path: 'patient' },
        { path: 'prescription', populate: { path: 'medicineItems.medicine' } },
        { path: 'serviceItems.service' },
      ],
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalRecordsService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto,
  ) {
    if (updateMedicalRecordDto?.medicineItems) {
      const a = await this.prescriptionService.update(
        updateMedicalRecordDto.prescriptionId,
        {
          $set: {
            medicineItems: updateMedicalRecordDto?.medicineItems?.map(
              (item) => ({
                ...item,
                medicineId: new Types.ObjectId(item.medicineId),
              }),
            ),
          },
        },
      );
      return await this.medicalRecordsService.update(
        id,
        updateMedicalRecordDto,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const medicalRecord = await this.medicalRecordsService.findOneById(id);
    await this.prescriptionService.remove(medicalRecord?.prescriptionId);
    return await this.medicalRecordsService.remove(id);
  }
}
