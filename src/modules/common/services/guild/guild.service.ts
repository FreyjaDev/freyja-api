import { SnowflakeId, ULID } from '@freyja-models/freyja-models';
import { Guild, RatingType, User } from '@freyja-models/freyja-models/entities';
import { GuildRepository } from '@freyja-models/freyja-models/repositories/guild/guild.repository';
import { RatingTypeRepository } from '@freyja-models/freyja-models/repositories/rating-type/rating-type.repository';
import { UserRepository } from '@freyja-models/freyja-models/repositories/user/user.repository';
import { Injectable } from '@nestjs/common';
import { ulid } from 'ulidx';

import { GuildAlreadyInitializedException } from '../../../../common/error';
import { DiscordService } from '../../../../common/shared/services/discord/discord.service';
import { UserService } from '../user/user.service';

@Injectable()
export class GuildService {
  constructor(
    private readonly discordService: DiscordService,
    private readonly guildRepository: GuildRepository,
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly ratingTypeRepository: RatingTypeRepository,
  ) {}

  async initializeGuild(guildId: string): Promise<Guild> {
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

    return newGuild;
  }

  async createRatingType(guild: Guild, name: string): Promise<RatingType> {
    const ratingType = RatingType.create({
      guildId: guild.id.value(),
      name,
    });

    await this.ratingTypeRepository.save(ratingType);

    return ratingType;
  }

  async getRatingTypes(guild: Guild): Promise<RatingType[]> {
    return await this.ratingTypeRepository.findAllByGuildId(guild.discordId);
  }

  async findGuildByGuildId(guildId: string): Promise<Guild | undefined> {
    return await this.guildRepository.findBySnowflakeId(
      new SnowflakeId(guildId),
    );
  }

  async findRatingTypeByRatingTypeId(
    guild: Guild,
    ratingTypeId: string,
  ): Promise<RatingType | undefined> {
    return await this.ratingTypeRepository.findById(
      guild.discordId,
      ULID.of(ratingTypeId),
    );
  }

  async deleteRatingType(ratingType: RatingType): Promise<void> {
    await this.ratingTypeRepository.delete(ratingType);
  }

  async createGameResult(
    guild: Guild,
    ratingType: RatingType,
    winner: User,
    loser: User,
  ): Promise<void> {
    const winnerRating = await this.userService.findOrCreateUserRating(
      guild,
      ratingType,
      winner,
    );
    const loserRating = await this.userService.findOrCreateUserRating(
      guild,
      ratingType,
      loser,
    );

    const ratingVariation = this.calculateRating(
      winnerRating.rating.value(),
      loserRating.rating.value(),
    );

    console.log(ratingVariation);
  }

  private calculateRating(winnerRating: number, loserRating: number): number {
    return this.clampRating(
      32 / 10 ** ((winnerRating - loserRating) / 400) + 1,
    );
  }

  private clampRating(rating: number): number {
    return Math.max(2, Math.min(32, rating));
  }

  private async createGuildUsers(userIds: string[]): Promise<void> {
    const guildUsers = userIds.map((discordUserId) => {
      return User.create({
        discordId: discordUserId,
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
