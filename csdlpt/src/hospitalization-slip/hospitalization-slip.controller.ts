import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalizationSlipService } from './hospitalization-slip.service';
import { CreateHospitalizationSlipDto } from './dto/create-hospitalization-slip.dto';
import { UpdateHospitalizationSlipDto } from './dto/update-hospitalization-slip.dto';

@Controller('hospitalization-slip')
export class HospitalizationSlipController {
  constructor(private readonly hospitalizationSlipService: HospitalizationSlipService) {}

  @Post()
  create(@Body() createHospitalizationSlipDto: CreateHospitalizationSlipDto) {
    return this.hospitalizationSlipService.create(createHospitalizationSlipDto);
  }

  @Get()
  findAll() {
    return this.hospitalizationSlipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalizationSlipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospitalizationSlipDto: UpdateHospitalizationSlipDto) {
    return this.hospitalizationSlipService.update(+id, updateHospitalizationSlipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalizationSlipService.remove(+id);
  }
}
