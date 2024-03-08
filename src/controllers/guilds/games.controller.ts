import { guildGameResultService } from '../../services/guild-game-result.service';

/**
 * Post a game result
 * @param guildId Discord guild ID
 * @param winUserId Discord user ID of the winner
 * @param loseUserId Discord user ID of the loser
 */
export const postGameResult = async (
  guildId: string,
  winUserId: string,
  loseUserId: string,
) => {
  const { winUser, loseUser } =
    await guildGameResultService.postGuildGameResult(
      guildId,
      winUserId,
      loseUserId,
    );

  return { winUser: winUser.toDto(), loseUser: loseUser.toDto() };
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
  return await guildGameResultService.getGuildGameResults(
    guildId,
    limit,
    offset,
  );
};
