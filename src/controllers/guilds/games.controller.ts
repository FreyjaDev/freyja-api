import { container } from 'tsyringe';
import { GuildGameResultService } from '../../services/guild-game-result.service';

/**
 * Post a game result
 * @param guildId Discord guild ID
 * @param winUserId Discord user ID of the winner
 * @param loseUserId Discord user ID of the loser
 */
export const postGameResult = (
  guildId: string,
  winUserId: string,
  loseUserId: string,
) => {
  // TODO: Implement this function
  console.log('guildId', guildId);
  console.log('winUserId', winUserId);
  console.log('loseUserId', loseUserId);
};

/**
 * Get game results
 * @param guildId Discord guild ID
 * @param limit Number of results to return
 * @param offset Offset of the results
 */
export const getGameResults = async (
  guildId: string,
  limit: number,
  offset: number,
) => {
  const guildGameResultService = container.resolve(GuildGameResultService);

  return await guildGameResultService.getGuildGameResults(
    guildId,
    limit,
    offset,
  );
};
