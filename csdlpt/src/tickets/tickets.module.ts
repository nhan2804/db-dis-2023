import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './entities/ticket.entity';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import { PrescriptionsModule } from 'src/prescriptions/prescriptions.module';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Ticket.name,
        schema: TicketSchema,
      },
    ]),
    PrescriptionsModule,
  ],
  exports: [TicketsService],
})
export class TicketsModule {}
