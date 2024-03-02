import { index, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { userRatingSchema } from './user-rating.schema';

export const gameResultSchema = pgTable(
  'game_result',
  {
    id: uuid('id').primaryKey(),
    guildId: varchar('guild_id', { length: 20 }).notNull(),
    winUserId: uuid('win_user_id')
      .notNull()
      .references(() => userRatingSchema.id),
    loseUserId: uuid('lose_user_id')
      .notNull()
      .references(() => userRatingSchema.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    guildIdIndex: index().on(table.guildId),
  }),
);
