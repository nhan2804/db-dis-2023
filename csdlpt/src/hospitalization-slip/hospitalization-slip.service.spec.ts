import { Test, TestingModule } from '@nestjs/testing';
import { HospitalizationSlipService } from './hospitalization-slip.service';

describe('HospitalizationSlipService', () => {
  let service: HospitalizationSlipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HospitalizationSlipService],
    }).compile();

    service = module.get<HospitalizationSlipService>(HospitalizationSlipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
