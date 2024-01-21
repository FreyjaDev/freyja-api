import { SnowflakeId, ULID } from '@freyja-models/freyja-models';
import Guild from '@freyja-models/freyja-models/entities/guild';
import { Test, TestingModule } from '@nestjs/testing';
import { ulid } from 'ulidx';

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

  it('should create a new entity.', async () => {
    const id = new ULID(ulid());
    const snowflakeId = new SnowflakeId('123456789012345678');

    const guild = Guild.create({ discordId: snowflakeId.value, id: id.value });
    await service.save(guild);

    const fetchedGuild = await service.findBySnowflakeId(snowflakeId);

    expect(fetchedGuild).not.toEqual(undefined);
    expect(fetchedGuild?.id).toEqual(id);
    expect(fetchedGuild?.discordId).toEqual(snowflakeId);
  });
});
