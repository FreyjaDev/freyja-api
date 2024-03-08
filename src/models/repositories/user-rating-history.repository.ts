import { UserRatingHistory } from '../entities/user-rating-history.entity';
import { db as defaultDb } from '../../common/database';
import { userRatingHistorySchema } from '../schemas';

export const userRatingHistoryRepository = {
  save: async (
    userRatingHistory: UserRatingHistory,
    db: typeof defaultDb = defaultDb,
  ) => {
    await db
      .insert(userRatingHistorySchema)
      .values({
        id: userRatingHistory.id,
        userRatingId: userRatingHistory.userRatingId,
        gameResultId: userRatingHistory.gameResultId,
        rating: userRatingHistory.rating,
        createdAt: userRatingHistory.createdAt,
        updatedAt: userRatingHistory.updatedAt,
      })
      .onConflictDoUpdate({
        set: {
          rating: userRatingHistory.rating,
          updatedAt: userRatingHistory.updatedAt,
        },
        target: [userRatingHistorySchema.id],
      });
  },
};
