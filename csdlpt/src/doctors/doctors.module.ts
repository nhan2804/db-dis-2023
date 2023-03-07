import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorSchema } from './entities/doctor.entity';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService],
  imports: [
    MongooseModule.forFeature([
      { name: DoctorsModule.name, schema: DoctorSchema },
    ]),
  ],
})
export class DoctorsModule {}
