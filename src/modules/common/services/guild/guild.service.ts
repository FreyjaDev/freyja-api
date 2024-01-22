import { SnowflakeId } from '@freyja-models/freyja-models';
import Guild from '@freyja-models/freyja-models/entities/guild';
import User from '@freyja-models/freyja-models/entities/user';
import { GuildRepository } from '@freyja-models/freyja-models/repositories/guild/guild.repository';
import { UserRepository } from '@freyja-models/freyja-models/repositories/user/user.repository';
import { Injectable, Logger } from '@nestjs/common';
import { ulid } from 'ulidx';

import { GuildAlreadyInitializedException } from '../../../../common/error';
import { DiscordService } from '../../../../common/shared/services/discord/discord.service';

@Injectable()
export class GuildService {
  constructor(
    private readonly discordService: DiscordService,
    private readonly guildRepository: GuildRepository,
    private readonly logger: Logger,
    private readonly userRepository: UserRepository,
  ) {}

  async initializeGuild(guildId: string): Promise<void> {
    const snowflakeId = new SnowflakeId(guildId);
    const guild = await this.guildRepository.findBySnowflakeId(snowflakeId);

    if (guild !== undefined) {
      throw new GuildAlreadyInitializedException();
    }

    const id = ulid();
    const newGuild = Guild.create({ discordId: guildId, id });

    await this.guildRepository.save(newGuild);
    const guildMembers = await this.discordService.getGuildMembers(
      guildId,
      1000,
    );

    await this.createGuildUsers(
      guildMembers.reduce((acc, member) => {
        if (member.user === undefined) {
          return acc;
        }

        if (member.user.bot) {
          return acc;
        }

        if (member.user.system) {
          return acc;
        }

        return [...acc, member.user.id];
      }, [] as string[]),
    );
  }

  private async createGuildUsers(userIds: string[]): Promise<void> {
    const guildUsers = userIds.map((discordUserId) => {
      const userId = ulid();

      return User.create({
        discordId: discordUserId,
        id: userId,
      });
    });

    const users = await this.userRepository.findAllBySnowflakeIds(
      guildUsers.map((user) => user.discordId),
    );

    const usersToCreate = guildUsers.filter((user) => {
      return users.find((u) => u.discordId === user.discordId) === undefined;
    });

    await this.userRepository.saveAll(usersToCreate);
  }
}
