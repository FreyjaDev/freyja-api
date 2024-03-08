import { db as defaultDb } from '../../common/database';
import { gameResultSchema } from '../schemas';
import { and, desc, eq, or } from 'drizzle-orm';
import { gameResult, GameResult } from '../entities/game-result.entity';

export const gameResultRepository = {
  findById: async (id: string, db: typeof defaultDb = defaultDb) => {
    const records = await db
      .select()
      .from(gameResultSchema)
      .where(eq(gameResultSchema.id, id));

    if (records.length < 1) {
      return undefined;
    }
    const data = records[0];

    return gameResult({
      id: data.id,
      guildId: data.guildId,
      winUser: data.winUserId,
      loseUser: data.loseUserId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  },
  findByGuildId: async (
    guildId: string,
    limit: number,
    offset: number,
    db: typeof defaultDb = defaultDb,
  ): Promise<GameResult[]> => {
    const records = await db
      .select()
      .from(gameResultSchema)
      .where(eq(gameResultSchema.guildId, guildId))
      .orderBy(desc(gameResultSchema.createdAt))
      .limit(limit)
      .offset(offset);

    return records.map((data) =>
      gameResult({
        id: data.id,
        guildId: data.guildId,
        winUser: data.winUserId,
        loseUser: data.loseUserId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      }),
    );
  },
  findByGuildIdAndUserId: async (
    guildId: string,
    userId: string,
    limit: number,
    offset: number,
    db: typeof defaultDb = defaultDb,
  ): Promise<GameResult[]> => {
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

    return records.map((data) =>
      gameResult({
        id: data.id,
        guildId: data.guildId,
        winUser: data.winUserId,
        loseUser: data.loseUserId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      }),
    );
  },
  save: async (gameResult: GameResult, db: typeof defaultDb = defaultDb) => {
    await db
      .insert(gameResultSchema)
      .values({
        id: gameResult.id,
        guildId: gameResult.guildId,
        winUserId: gameResult.winUserId,
        loseUserId: gameResult.loseUserId,
        createdAt: gameResult.createdAt,
        updatedAt: gameResult.updatedAt,
      })
      .onConflictDoUpdate({
        set: {
          winUserId: gameResult.winUserId,
          loseUserId: gameResult.loseUserId,
          updatedAt: gameResult.updatedAt,
        },
        target: [gameResultSchema.id],
      });
  },
};
