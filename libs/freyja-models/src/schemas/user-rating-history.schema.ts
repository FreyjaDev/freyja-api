import { modelBaseColumns } from '@freyja-models/freyja-models/common/definitions/model-base';
import gameResultTable from '@freyja-models/freyja-models/schemas/game-result';
import userTable from '@freyja-models/freyja-models/schemas/user';
import { bigint, pgTable, varchar } from 'drizzle-orm/pg-core';

const userRatingHistoryTable = pgTable('user_rating_history', {
  ...modelBaseColumns,
  gameResultId: varchar('game_result_id', { length: 26 })
    .notNull()
    .references(() => gameResultTable.id),
  rating: bigint('rating', { mode: 'number' }).notNull(),
  userRatingId: varchar('user_rating_id', { length: 26 })
    .notNull()
    .references(() => userTable.id),
});

export default userRatingHistoryTable;
