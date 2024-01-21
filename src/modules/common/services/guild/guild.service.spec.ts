import { Test, TestingModule } from '@nestjs/testing';

import { CommonModule } from '../../common.module';

import { GuildService } from './guild.service';

describe('GuildService', () => {
  let service: GuildService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
    }).compile();

    service = module.get<GuildService>(GuildService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
