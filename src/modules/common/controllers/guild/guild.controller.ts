import Guild from '@freyja-models/freyja-models/entities/guild';
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
import { JsonSerializable } from '../../../../common/interfaces/core/core';
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

  @Post(':guildId/rating-type')
  @HttpCode(201)
  async createRatingType(@Param('guildId') guildId: string): Promise<void> {
    // Guild の存在確認
    const guild = await this.guildService.findGuildByGuildId(guildId);

    if (guild === undefined) {
      throw new NotFoundException();
    }

    await this.guildService.createRatingType(guildId);
  }
}
