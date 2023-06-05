import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Controller('doctors')
export class DoctorsController {
  constructor(
    private readonly doctorsService: DoctorsService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    const dcotor = await this.doctorsService.create(createDoctorDto);
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash('password', saltOrRounds);
    const user = await this.userService.createDoctorUser(
      dcotor._id,
      dcotor.cccd,
      hashedPassword,
    );
    return dcotor;
  }

  @Get()
  findAll() {
    return this.doctorsService.findAllWithoutPagination(
      undefined,
      undefined,
      'department',
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }
}
