import { integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { userRatingSchema } from './user-rating.schema';
import { gameResultSchema } from './game-result.schema';

export const userRatingHistorySchema = pgTable('user_rating_history', {
  id: uuid('id').primaryKey(),
  userRatingId: uuid('user_rating_id')
    .notNull()
    .references(() => userRatingSchema.id),
  gameResultId: uuid('game_result_id').references(() => gameResultSchema.id),
  rating: integer('rating').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
