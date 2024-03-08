import { userRating, UserRating } from '../entities/user-rating.entity';
import { db as defaultDb } from '../../common/database';
import { userRatingSchema } from '../schemas';
import { and, eq } from 'drizzle-orm';

export const userRatingRepository = {
  findById: async (id: string, db: typeof defaultDb = defaultDb) => {
    const records = await db
      .select()
      .from(userRatingSchema)
      .where(eq(userRatingSchema.id, id));

    if (records.length < 1) {
      return undefined;
    }

    return userRating({
      id: records[0].id,
      userId: records[0].userId,
      guildId: records[0].guildId,
      rating: records[0].rating,
      createdAt: records[0].createdAt,
      updatedAt: records[0].updatedAt,
    });
  },
  findByGuildIdAndUserId: async (
    guildId: string,
    userId: string,
    db: typeof defaultDb = defaultDb,
  ) => {
    const records = await db
      .select()
      .from(userRatingSchema)
      .where(
        and(
          eq(userRatingSchema.guildId, guildId),
          eq(userRatingSchema.userId, userId),
        ),
      );

    if (records.length < 1) {
      return undefined;
    }

    return userRating({
      id: records[0].id,
      userId: records[0].userId,
      guildId: records[0].guildId,
      rating: records[0].rating,
      createdAt: records[0].createdAt,
      updatedAt: records[0].updatedAt,
    });
  },
  save: async (userRating: UserRating, db: typeof defaultDb = defaultDb) => {
    await db
      .insert(userRatingSchema)
      .values({
        id: userRating.id,
        userId: userRating.userId,
        guildId: userRating.guildId,
        rating: userRating.rating,
        createdAt: userRating.createdAt,
        updatedAt: userRating.updatedAt,
      })
      .onConflictDoUpdate({
        set: {
          rating: userRating.rating,
          updatedAt: userRating.updatedAt,
        },
        target: [userRatingSchema.id],
      });
  },
};
