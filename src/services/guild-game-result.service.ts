import { singleton } from 'tsyringe';
import { GameResultRepository } from '../models/repositories/game-result.repository';

@singleton()
export class GuildGameResultService {
  constructor(private readonly gameResultRepository: GameResultRepository) {}

  async getGuildGameResults(guildId: string, limit: number, offset: number) {
    const results = await this.gameResultRepository.findByGuildId(
      guildId,
      limit,
      offset,
    );

    return results.map((gameResult) => gameResult.toDto());
  }
}
