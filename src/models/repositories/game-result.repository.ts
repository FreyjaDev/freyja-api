import { db as defaultDb } from '../../common/database';
import { gameResultSchema } from '../schemas';
import { and, desc, eq, or } from 'drizzle-orm';
import { GameResult } from '../entities/game-result.entity';

export class GameResultRepository {
  private static _instance: GameResultRepository;
  private constructor() {}
  static get instance() {
    if (!this._instance) {
      this._instance = new GameResultRepository();
    }
    return this._instance;
  }

  async findById(
    id: string,
    db: typeof defaultDb = defaultDb,
  ): Promise<GameResult | undefined> {
    const records = await db
      .select()
      .from(gameResultSchema)
      .where(eq(gameResultSchema.id, id));

    if (records.length < 1) {
      return undefined;
    }
    const data = records[0];

    return new GameResult({
      id: data.id,
      guildId: data.guildId,
      winUserId: data.winUserId,
      loseUserId: data.loseUserId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  async findByGuildId(
    guildId: string,
    limit: number,
    offset: number,
    db: typeof defaultDb = defaultDb,
  ): Promise<GameResult[]> {
    const records = await db
      .select()
      .from(gameResultSchema)
      .where(eq(gameResultSchema.guildId, guildId))
      .orderBy(desc(gameResultSchema.createdAt))
      .limit(limit)
      .offset(offset);

    return records.map(
      (data) =>
        new GameResult({
          id: data.id,
          guildId: data.guildId,
          winUserId: data.winUserId,
          loseUserId: data.loseUserId,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        }),
    );
  }

  async findByGuildIdAndUserId(
    guildId: string,
    userId: string,
    limit: number,
    offset: number,
    db: typeof defaultDb = defaultDb,
  ): Promise<GameResult[]> {
    const records = await db
      .select()
      .from(gameResultSchema)
      .where(
        and(
          eq(gameResultSchema.guildId, guildId),
          or(
            eq(gameResultSchema.winUserId, userId),
            eq(gameResultSchema.loseUserId, userId),
          ),
        ),
      )
      .orderBy(desc(gameResultSchema.createdAt))
      .limit(limit)
      .offset(offset);

    return records.map(
      (data) =>
        new GameResult({
          id: data.id,
          guildId: data.guildId,
          winUserId: data.winUserId,
          loseUserId: data.loseUserId,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        }),
    );
  }

  save() {}
}
