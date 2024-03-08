import { gameResultRepository } from '../models/repositories/game-result.repository';
import { userRatingRepository } from '../models/repositories/user-rating.repository';
import { UserRating, userRating } from '../models/entities/user-rating.entity';

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
  ) => {
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

  await userRatingRepository.save(rating);

  return rating;
};

const calculateRating = (winnerRating: number, loserRating: number): number => {
  return clampRating(32 / 10 ** ((winnerRating - loserRating) / 400) + 1);
};

const clampRating = (rating: number): number => {
  return Math.max(2, Math.min(32, rating));
};
