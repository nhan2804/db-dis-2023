import { Injectable } from '@nestjs/common';
import { CreateHospitalizationSlipDto } from './dto/create-hospitalization-slip.dto';
import { UpdateHospitalizationSlipDto } from './dto/update-hospitalization-slip.dto';

@Injectable()
export class HospitalizationSlipService {
  create(createHospitalizationSlipDto: CreateHospitalizationSlipDto) {
    return 'This action adds a new hospitalizationSlip';
  }

  findAll() {
    return `This action returns all hospitalizationSlip`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hospitalizationSlip`;
  }

  update(id: number, updateHospitalizationSlipDto: UpdateHospitalizationSlipDto) {
    return `This action updates a #${id} hospitalizationSlip`;
  }

  remove(id: number) {
    return `This action removes a #${id} hospitalizationSlip`;
  }
}
