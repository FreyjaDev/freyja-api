import { modelBaseColumns } from '@freyja-models/freyja-models/common/definitions/model-base';
import guild from '@freyja-models/freyja-models/models/guild';
import ratingType from '@freyja-models/freyja-models/models/rating-type';
import user from '@freyja-models/freyja-models/models/user';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

const gameResult = pgTable('game_result', {
  ...modelBaseColumns,
  guildId: varchar('guild_id', { length: 26 })
    .notNull()
    .references(() => guild.id, { onDelete: 'cascade' }),
  loserUserId: varchar('loser_user_id', { length: 26 })
    .notNull()
    .references(() => user.id),
  ratingTypeId: varchar('rating_type_id', { length: 26 })
    .notNull()
    .references(() => ratingType.id, { onDelete: 'cascade' }),
  winnerUserId: varchar('winner_user_id', { length: 26 })
    .notNull()
    .references(() => user.id),
});

export default gameResult;
