import { ConflictException, Controller, Param, Post } from '@nestjs/common';

import { GuildAlreadyInitializedException } from '../../../../common/error';
import { GuildService } from '../../services/guild/guild.service';

@Controller('guild/:guildId')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Post('')
  async initializeGuild(@Param('guildId') guildId: string): Promise<void> {
    try {
      await this.guildService.initializeGuild(guildId);
    } catch (error) {
      if (error instanceof GuildAlreadyInitializedException) {
        throw new ConflictException();
      }
    }
  }
}
