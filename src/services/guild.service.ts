import { userRatingRepository } from '../models/repositories/user-rating.repository';

export const guildService = {
  getGuildLeaderboard: async (
    guildId: string,
    limit: number,
    offset: number,
  ) => {
    return await userRatingRepository.getGuildMemberRatingsOrderByRating(
      guildId,
      limit,
      offset,
    );
  },
};
