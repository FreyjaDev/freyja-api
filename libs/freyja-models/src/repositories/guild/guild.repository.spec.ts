import { Test, TestingModule } from '@nestjs/testing';

import { GuildRepository } from './guild.repository';

describe('GuildRepository', () => {
  let service: GuildRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuildRepository],
    }).compile();

    service = module.get<GuildRepository>(GuildRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
