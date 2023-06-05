import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrescriptionsService } from 'src/prescriptions/prescriptions.service';
import { Types } from 'mongoose';

@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly prescriptionService: PrescriptionsService,
  ) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    const { medicineItems = [], ...ticket } = createTicketDto;
    const pres = await this.prescriptionService.create({
      medicineItems: medicineItems?.map((item) => ({
        ...item,
        medicineId: new Types.ObjectId(item.medicineId),
      })),
      doctorId: ticket.doctorId,
      patientId: ticket.patientId,
    });
    return this.ticketsService.create({
      ...createTicketDto,
      prescriptionId: pres._id,
    });
  }

  @Get()
  findAll() {
    return this.ticketsService.findAllWithoutPagination(undefined, undefined, [
      { path: 'doctor' },
      { path: 'patient' },
      { path: 'prescription', populate: { path: 'medicineItems.medicine' } },
      { path: 'serviceItems.service' },
    ]);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    if (updateTicketDto?.medicineItems) {
      const a = await this.prescriptionService.update(
        updateTicketDto.prescriptionId,
        {
          $set: {
            medicineItems: updateTicketDto?.medicineItems?.map((item) => ({
              ...item,
              medicineId: new Types.ObjectId(item.medicineId),
            })),
          },
        },
      );
      console.log(a);
    }
    return await this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const ticket = await this.ticketsService.findOneById(id);
    await this.prescriptionService.remove(ticket?.prescriptionId);
    return this.ticketsService.remove(id);
  }
}
