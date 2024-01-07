import modelBaseColumns from '@freyja-models/freyja-models/common/definitions/model-base';
import gameResult from '@freyja-models/freyja-models/models/game-result';
import user from '@freyja-models/freyja-models/models/user';
import { bigint, pgTable } from 'drizzle-orm/pg-core';

const userRatingHistory = pgTable('user_rating_history', {
  ...modelBaseColumns,
  gameResultId: bigint('game_result_id', { mode: 'number' })
    .notNull()
    .references(() => gameResult.id),
  rating: bigint('rating', { mode: 'number' }).notNull(),
  userRatingId: bigint('user_rating_id', { mode: 'number' })
    .notNull()
    .references(() => user.id),
});

export default userRatingHistory;
