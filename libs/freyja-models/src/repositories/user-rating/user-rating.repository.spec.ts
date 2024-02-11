import { Test, TestingModule } from '@nestjs/testing';

import { UserRatingRepository } from './user-rating.repository';

describe('UserRatingRepository', () => {
  let service: UserRatingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRatingRepository],
    }).compile();

    service = module.get<UserRatingRepository>(UserRatingRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
