import UserRating from '@freyja-models/freyja-models/entities/user-rating.entity';
import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { ULID } from '../../common/value-objects';
import { userRatingSchema, userSchema } from '../../schemas';

@Injectable()
export class UserRatingRepository {
  constructor(
    @Inject('DATABASE') private readonly database: PostgresJsDatabase,
  ) {}

  async findUserRatingByUserId(guildId: ULID, userId: ULID) {
    const records = await this.database
      .select({ userRating: userRatingSchema })
      .from(userSchema)
      .innerJoin(userRatingSchema, eq(userSchema.id, userRatingSchema.userId))
      .where(
        and(
          eq(userRatingSchema.guildId, guildId.value()),
          eq(userSchema.id, userId.value()),
        ),
      );

    if (records.length <= 0) {
      return undefined;
    }

    const userRating = records[0].userRating;

    return UserRating.create({
      createdAt: new Date(userRating.createdAt),
      guildId: userRating.guildId,
      id: userRating.id,
      rating: userRating.rating,
      ratingTypeId: userRating.ratingTypeId,
      updatedAt: new Date(userRating.updatedAt),
      userId: userRating.userId,
    });
  }

  async save(userRating: UserRating) {
    await this.database
      .insert(userRatingSchema)
      .values({
        createdAt: userRating.createdAt.value(),
        guildId: userRating.guildId.value(),
        id: userRating.id.value(),
        rating: userRating.rating.value(),
        ratingTypeId: userRating.ratingTypeId.value(),
        updatedAt: userRating.updatedAt.value(),
        userId: userRating.userId.value(),
      })
      .onConflictDoUpdate({
        set: {
          rating: userRating.rating.value(),
          updatedAt: userRating.updatedAt.value(),
        },
        target: [userRatingSchema.id],
      });
  }
}
