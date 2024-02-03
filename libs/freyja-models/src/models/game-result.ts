import { modelBaseColumns } from '@freyja-models/freyja-models/common/definitions/model-base';
import guildTable from '@freyja-models/freyja-models/models/guild';
import ratingTypeTable from '@freyja-models/freyja-models/models/rating-type';
import userTable from '@freyja-models/freyja-models/models/user';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

const gameResultTable = pgTable('game_result', {
  ...modelBaseColumns,
  guildId: varchar('guild_id', { length: 26 })
    .notNull()
    .references(() => guildTable.id, { onDelete: 'cascade' }),
  loserUserId: varchar('loser_user_id', { length: 26 })
    .notNull()
    .references(() => userTable.id),
  ratingTypeId: varchar('rating_type_id', { length: 26 })
    .notNull()
    .references(() => ratingTypeTable.id, { onDelete: 'cascade' }),
  winnerUserId: varchar('winner_user_id', { length: 26 })
    .notNull()
    .references(() => userTable.id),
});

export default gameResultTable;
