import { SnowflakeId } from '@freyja-models/freyja-models';
import { Guild, RatingType, User } from '@freyja-models/freyja-models/entities';
import UserRating from '@freyja-models/freyja-models/entities/user-rating.entity';
import { UserRepository } from '@freyja-models/freyja-models/repositories/user/user.repository';
import { UserRatingRepository } from '@freyja-models/freyja-models/repositories/user-rating/user-rating.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRatingRepository: UserRatingRepository,
  ) {}

  async findUserByUserId(discordUserId: string) {
    return await this.userRepository.findBySnowflakeId(
      SnowflakeId.of(discordUserId),
    );
  }

  async findOrCreateUserByUserId(discordUserId: string) {
    let user = await this.findUserByUserId(discordUserId);
    if (user === undefined) {
      user = User.create({ discordId: discordUserId });

      await this.userRepository.save(user);
    }
    return user;
  }
  async findOrCreateUserRating(
    guild: Guild,
    ratingType: RatingType,
    user: User,
  ) {
    let userRating = await this.userRatingRepository.findUserRatingByUserId(
      guild.id,
      user.id,
    );

    if (userRating) {
      return userRating;
    }

    userRating = UserRating.create({
      guildId: guild.id.value(),
      ratingTypeId: ratingType.id.value(),
      userId: user.id.value(),
    });

    await this.userRatingRepository.save(userRating);

    return userRating;
  }
}
