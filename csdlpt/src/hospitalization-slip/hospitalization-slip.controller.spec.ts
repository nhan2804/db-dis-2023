import { Test, TestingModule } from '@nestjs/testing';
import { HospitalizationSlipController } from './hospitalization-slip.controller';
import { HospitalizationSlipService } from './hospitalization-slip.service';

describe('HospitalizationSlipController', () => {
  let controller: HospitalizationSlipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HospitalizationSlipController],
      providers: [HospitalizationSlipService],
    }).compile();

    controller = module.get<HospitalizationSlipController>(HospitalizationSlipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
