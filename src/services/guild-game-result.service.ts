import { gameResultRepository } from '../models/repositories/game-result.repository';
import { userRatingRepository } from '../models/repositories/user-rating.repository';
import { UserRating, userRating } from '../models/entities/user-rating.entity';
import { userRatingHistory } from '../models/entities/user-rating-history.entity';
import { db } from '../common/database';
import { userRatingHistoryRepository } from '../models/repositories/user-rating-history.repository';
import { gameResult } from '../models/entities/game-result.entity';

export const guildGameResultService = {
  getGuildGameResults: async (
    guildId: string,
    limit: number,
    offset: number,
  ) => {
    const results = await gameResultRepository.findByGuildId(
      guildId,
      limit,
      offset,
    );

    return results.map((gameResult) => gameResult.toDto());
  },
  postGuildGameResult: async (
    guildId: string,
    winUserId: string,
    loseUserId: string,
  ): Promise<{ winUser: UserRating; loseUser: UserRating }> => {
    const winUser =
      (await userRatingRepository.findByGuildIdAndUserId(guildId, winUserId)) ??
      (await createUserRating(guildId, winUserId));

    const loseUser =
      (await userRatingRepository.findByGuildIdAndUserId(
        guildId,
        loseUserId,
      )) ?? (await createUserRating(guildId, loseUserId));

    const ratingDiff = calculateRating(winUser.rating, loseUser.rating);

    winUser.increaseRating(ratingDiff);
    loseUser.decreaseRating(ratingDiff);

    const result = gameResult({
      guildId,
      winUser,
      loseUser,
    });

    const winUserHistory = userRatingHistory({
      userRating: winUser,
      rating: winUser.rating,
      gameResult: result,
    });
    const loseUserHistory = userRatingHistory({
      userRating: loseUser,
      rating: loseUser.rating,
      gameResult: result,
    });

    await db.transaction(async (tx) => {
      await userRatingRepository.save(winUser, tx);
      await userRatingRepository.save(loseUser, tx);
      await gameResultRepository.save(result, tx);
      await userRatingHistoryRepository.save(winUserHistory, tx);
      await userRatingHistoryRepository.save(loseUserHistory, tx);
    });

    return { winUser, loseUser };
  },
};

const createUserRating = async (
  guildId: string,
  userId: string,
): Promise<UserRating> => {
  const rating = userRating({
    guildId,
    userId,
    rating: 1500,
  });
  const history = userRatingHistory({
    userRating: rating,
    rating: rating.rating,
  });

  await db.transaction(async (tx) => {
    await userRatingRepository.save(rating, tx);
    await userRatingHistoryRepository.save(history, tx);
  });

  return rating;
};

const calculateRating = (
  winnerRating: number,
  loserRating: number,
  kFactor: number = 32,
): number => {
  return clampRating(
    Math.round(kFactor / (10 ** ((winnerRating - loserRating) / 400) + 1)),
  );
};

const clampRating = (rating: number): number => {
  return Math.max(2, Math.min(32, rating));
};
