import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from './entities/doctor.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService],
  imports: [
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
    UsersModule,
  ],
})
export class DoctorsModule {}
