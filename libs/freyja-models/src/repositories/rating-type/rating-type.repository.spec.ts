import { Test, TestingModule } from '@nestjs/testing';

import { RatingTypeRepository } from './rating-type.repository';

describe('RatingTypeRepository', () => {
  let service: RatingTypeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatingTypeRepository],
    }).compile();

    service = module.get<RatingTypeRepository>(RatingTypeRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
