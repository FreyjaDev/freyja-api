import { guildService } from '../../services/guild.service';

export const getGuildLeaderboard = async (
  guildId: string,
  limit: number,
  offset: number,
) => {
  const ratings = await guildService.getGuildLeaderboard(
    guildId,
    limit,
    offset,
  );

  return ratings.map((rating) => rating.toDto());
};
