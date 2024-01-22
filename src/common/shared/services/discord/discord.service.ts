import { Provider } from '@nestjs/common';
import axios from 'axios';

import { discordApis } from '../../../constants/discord-apis';
import { DiscordGuildMember } from '../../../interfaces/discord/guild';

export const provideDiscordService = (): Provider => ({
  provide: DiscordService,
  useClass: DiscordServiceImpl,
});

export abstract class DiscordService {
  abstract getGuildMembers(
    guildId: string,
    limit: number,
  ): Promise<DiscordGuildMember[]>;
}

class DiscordServiceImpl extends DiscordService {
  private readonly token: string;

  constructor() {
    super();
    const token = process.env.DISCORD_BOT_TOKEN;

    if (token === undefined) {
      throw new Error('DISCORD_TOKEN is not defined');
    }
    this.token = token;
  }

  async getGuildMembers(guildId: string, limit: number) {
    let members: DiscordGuildMember[] = [];

    let fetchedMembers: DiscordGuildMember[] = [];
    let afterId: string | undefined = undefined;
    do {
      fetchedMembers = await this.fetchGuildMembers(guildId, limit, afterId);

      members = members.concat(fetchedMembers);
      if (fetchedMembers.length !== 0) {
        afterId = fetchedMembers[fetchedMembers.length - 1].user?.id;
      }
    } while (fetchedMembers.length === limit);

    return members;
  }

  private async fetchGuildMembers(
    guildId: string,
    limit?: number,
    after?: string,
  ) {
    const url = discordApis.guild.byId.members.replace(
      '{guildId}',
      encodeURIComponent(guildId),
    );

    const response = await axios.get<DiscordGuildMember[]>(url, {
      headers: {
        Authorization: `Bot ${this.token}`,
        'Content-Type': 'application/json',
      },
      params: {
        after,
        limit,
      },
    });

    return response.data;
  }
}
