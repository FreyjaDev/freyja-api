import { JsonSerializable } from '@freyja-models/freyja-models/common/utility-types';
import { Guild } from '@freyja-models/freyja-models/entities';
import {
  ConflictException,
  Controller,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { GuildAlreadyInitializedException } from '../../../../common/error';
import { GuildService } from '../../services/guild/guild.service';

@Controller('guild')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @Post(':guildId')
  @HttpCode(201)
  async initializeGuild(
    @Param('guildId') guildId: string,
  ): Promise<JsonSerializable> {
    let createGuild: Guild;
    try {
      createGuild = await this.guildService.initializeGuild(guildId);
    } catch (error) {
      if (error instanceof GuildAlreadyInitializedException) {
        throw new ConflictException();
      } else {
        throw new InternalServerErrorException();
      }
    }

    return createGuild.unwrap();
  }

  @Post(':guildId/rating-types')
  @HttpCode(201)
  async createRatingType(
    @Param('guildId') guildId: string,
    name: string,
  ): Promise<void> {
    // Guild の存在確認
    const guild = await this.guildService.findGuildByGuildId(guildId);

    if (guild === undefined) {
      throw new NotFoundException();
    }

    await this.guildService.createRatingType(guild, name);
  }
}
