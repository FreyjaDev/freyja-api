import { userRatingRepository } from '../models/repositories/user-rating.repository';

export const guildMemberService = {
  getGuildMemberRating: async (guildId: string, userId: string) => {
    return await userRatingRepository.findByGuildIdAndUserId(guildId, userId);
  },
};
