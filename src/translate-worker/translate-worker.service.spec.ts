import { Test, TestingModule } from '@nestjs/testing';
import { TranslateWorkerService } from './translate-worker.service';

describe('TranslateWorkerService', () => {
  let service: TranslateWorkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslateWorkerService],
    }).compile();

    service = module.get<TranslateWorkerService>(TranslateWorkerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
