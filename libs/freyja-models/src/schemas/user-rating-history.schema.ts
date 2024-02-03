import { bigint, pgTable, varchar } from 'drizzle-orm/pg-core';

import { schemaBaseColumns } from '../common/schema';

import gameResultSchema from './game-result.schema';
import userSchema from './user.schema';

const userRatingHistorySchema = pgTable('user_rating_history', {
  ...schemaBaseColumns,
  gameResultId: varchar('game_result_id', { length: 26 })
    .notNull()
    .references(() => gameResultSchema.id),
  rating: bigint('rating', { mode: 'number' }).notNull(),
  userRatingId: varchar('user_rating_id', { length: 26 })
    .notNull()
    .references(() => userSchema.id),
});

export default userRatingHistorySchema;
