import { FreyjaModelsModule } from '@freyja-models/freyja-models/freyja-models.module';
import { Test, TestingModule } from '@nestjs/testing';

import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let service: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FreyjaModelsModule.forFeature([UserRepository])],
    }).compile();

    service = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be created a new entity', () => {});
});
