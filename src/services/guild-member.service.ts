import { userRatingRepository } from '../models/repositories/user-rating.repository';

export const guildMemberService = {
  getGuildMemberRating: async (guildId: string, userId: string) => {
    const user = await userRatingRepository.findByGuildIdAndUserId(
      guildId,
      userId,
    );

    if (!user) {
      return undefined;
    }

    const rank = await userRatingRepository.getUserRank(user);

    return {
      user,
      rank,
    };
  },
};
