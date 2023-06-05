import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { AbstractService } from 'src/app/controllers/services/AbtrastService';
import { Ticket, TicketDocument } from './entities/ticket.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TicketsService extends AbstractService<Ticket> {
  constructor(
    @InjectModel(Ticket.name)
    readonly model: Model<TicketDocument>,
  ) {
    super(model);
  }
}
