import { modelBaseColumns } from '@freyja-models/freyja-models/common/definitions/model-base';
import gameResult from '@freyja-models/freyja-models/models/game-result';
import user from '@freyja-models/freyja-models/models/user';
import { bigint, pgTable, varchar } from 'drizzle-orm/pg-core';

const userRatingHistory = pgTable('user_rating_history', {
  ...modelBaseColumns,
  gameResultId: varchar('game_result_id', { length: 26 })
    .notNull()
    .references(() => gameResult.id),
  rating: bigint('rating', { mode: 'number' }).notNull(),
  userRatingId: varchar('user_rating_id', { length: 26 })
    .notNull()
    .references(() => user.id),
});

export default userRatingHistory;
