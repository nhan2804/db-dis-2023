import { MedicalRecord } from '../entities/medical-record.entity';

export class CreateMedicalRecordDto extends MedicalRecord {
  medicineItems: any[];
}
