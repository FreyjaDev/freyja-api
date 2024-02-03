import { Test, TestingModule } from '@nestjs/testing';
import { ulid } from 'ulidx';

import { SnowflakeId } from '../../common/value-objects';
import { Guild } from '../../entities';
import { guildFactory } from '../../factories';
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

  it('should return a specific guild correctly', async () => {
    const id = ulid();
    const guild = await guildFactory({ discordId: '123456789012345678', id });

    const actual = await service.findBySnowflakeId(guild.discordId);

    expect(actual).not.toEqual(undefined);
    expect(actual?.unwrap()).toEqual(guild.unwrap());
  });

  it('should create a new entity.', async () => {
    const snowflakeId = new SnowflakeId('123456789012345678');

    const guild = Guild.create({ discordId: snowflakeId.value() });
    await service.save(guild);

    const fetchedGuild = await service.findBySnowflakeId(snowflakeId);

    expect(fetchedGuild).not.toEqual(undefined);
    expect(fetchedGuild?.discordId).toEqual(snowflakeId);
  });
});
