import { SnowflakeId } from '@freyja-models/freyja-models';
import Guild from '@freyja-models/freyja-models/entities/guild';
import { GuildRepository } from '@freyja-models/freyja-models/repositories/guild/guild.repository';
import { Injectable } from '@nestjs/common';
import { ulid } from 'ulidx';

@Injectable()
export class GuildService {
  constructor(private readonly guildRepository: GuildRepository) {}

  async initializeGuild(guildId: string): Promise<void> {
    const snowflakeId = new SnowflakeId(guildId);
    const guild = await this.guildRepository.findBySnowflakeId(snowflakeId);

    if (guild !== undefined) {
      return;
    }

    const id = ulid();
    const newGuild = Guild.create({ discordId: guildId, id });

    await this.guildRepository.save(newGuild);
  }
}
