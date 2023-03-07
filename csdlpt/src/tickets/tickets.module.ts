import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketSchema } from './entities/ticket.entity';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: TicketsModule.name,
        schema: TicketSchema,
      },
    ]),
  ],
})
export class TicketsModule {}
