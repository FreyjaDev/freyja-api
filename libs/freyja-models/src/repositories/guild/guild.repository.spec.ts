import { Test, TestingModule } from '@nestjs/testing';

import { FreyjaModelsModule } from '../../freyja-models.module';

import { GuildRepository } from './guild.repository';

describe('GuildRepository', () => {
  let service: GuildRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FreyjaModelsModule.forFeature([GuildRepository])],
    }).compile();

    service = module.get<GuildRepository>(GuildRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
