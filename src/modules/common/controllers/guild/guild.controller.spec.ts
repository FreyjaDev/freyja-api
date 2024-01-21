import { Test, TestingModule } from '@nestjs/testing';

import { CommonModule } from '../../common.module';

import { GuildController } from './guild.controller';

describe('GuildController', () => {
  let controller: GuildController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
    }).compile();

    controller = module.get<GuildController>(GuildController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
