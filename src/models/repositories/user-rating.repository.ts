import { userRating, UserRating } from '../entities/user-rating.entity';
import { db as defaultDb } from '../../common/database';
import { userRatingSchema } from '../schemas';
import { and, desc, eq, sql } from 'drizzle-orm';

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
  getGuildMemberRatingsOrderByRating: async (
    guildId: string,
    limit: number,
    offset: number,
    db: typeof defaultDb = defaultDb,
  ): Promise<UserRating[]> => {
    const records = await db
      .select()
      .from(userRatingSchema)
      .where(eq(userRatingSchema.guildId, guildId))
      .orderBy(desc(userRatingSchema.rating))
      .limit(limit)
      .offset(offset);

    return records.map((record) =>
      userRating({
        id: record.id,
        userId: record.userId,
        guildId: record.guildId,
        rating: record.rating,
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
      }),
    );
  },
  getUserRank: async (
    userRating: UserRating,
    db: typeof defaultDb = defaultDb,
  ): Promise<number | undefined> => {
    const subQuery = db
      .select({
        rank: sql<number>`RANK() OVER(ORDER BY rating DESC)`.as('rank'),
        userId: userRatingSchema.userId,
      })
      .from(userRatingSchema)
      .where(eq(userRatingSchema.userId, userRating.userId))
      .orderBy(desc(userRatingSchema.rating))
      .as('sq');

    const records = await db
      .select({
        rank: subQuery.rank,
      })
      .from(subQuery)
      .where(eq(subQuery.userId, userRating.userId));

    if (records.length < 1) {
      return undefined;
    }

    return records[0].rank;
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
