import { Controller, Param, Post } from '@nestjs/common';

import { GuildService } from '../../services/guild/guild.service';

@Controller('guild/:guildId')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Post('')
  async initializeGuild(@Param('guildId') guildId: string): Promise<void> {
    await this.guildService.initializeGuild(guildId);
  }
}
