import { Module } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicineSchema } from './entities/medicine.entity';

@Module({
  controllers: [MedicinesController],
  providers: [MedicinesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: MedicinesModule.name,
        schema: MedicineSchema,
      },
    ]),
  ],
})
export class MedicinesModule {}
