import { JsonSerializable } from '@freyja-models/freyja-models/common/utility-types';
import { Guild } from '@freyja-models/freyja-models/entities';
import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { GuildAlreadyInitializedException } from '../../../../common/error';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { GuildService } from '../../services/guild/guild.service';
import {
  CreateRatingTypeDto,
  createRatingTypeSchema,
} from '../../validators/create-rating-type.validator';

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
    @Body(new ZodValidationPipe(createRatingTypeSchema))
    createRatingTypeDto: CreateRatingTypeDto,
  ): Promise<JsonSerializable> {
    // Guild の存在確認
    const guild = await this.guildService.findGuildByGuildId(guildId);

    if (guild === undefined) {
      throw new NotFoundException();
    }

    const ratingType = await this.guildService.createRatingType(
      guild,
      createRatingTypeDto.name,
    );

    return ratingType.unwrap();
  }

  @Get(':guildId/rating-types')
  @HttpCode(200)
  async getRatingTypes(
    @Param('guildId') guildId: string,
  ): Promise<JsonSerializable[]> {
    const guild = await this.guildService.findGuildByGuildId(guildId);

    if (guild === undefined) {
      throw new NotFoundException();
    }

    const ratingTypes = await this.guildService.getRatingTypes(guild);

    return ratingTypes.map((ratingType) => ratingType.unwrap());
  }
}
