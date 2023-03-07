import { PartialType } from '@nestjs/mapped-types';
import { CreateHospitalizationSlipDto } from './create-hospitalization-slip.dto';

export class UpdateHospitalizationSlipDto extends PartialType(CreateHospitalizationSlipDto) {}
