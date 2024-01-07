import modelBaseColumns from '@freyja-models/freyja-models/common/definitions/model-base';
import guild from '@freyja-models/freyja-models/models/guild';
import ratingType from '@freyja-models/freyja-models/models/rating-type';
import user from '@freyja-models/freyja-models/models/user';
import { bigint, pgTable } from 'drizzle-orm/pg-core';

const gameResult = pgTable('game_result', {
  ...modelBaseColumns,
  guildId: bigint('guild_id', { mode: 'number' })
    .notNull()
    .references(() => guild.id, { onDelete: 'cascade' }),
  loserUserId: bigint('loser_user_id', { mode: 'number' })
    .notNull()
    .references(() => user.id),
  ratingTypeId: bigint('rating_type_id', { mode: 'number' })
    .notNull()
    .references(() => ratingType.id, { onDelete: 'cascade' }),
  winnerUserId: bigint('winner_user_id', { mode: 'number' })
    .notNull()
    .references(() => user.id),
});

export default gameResult;
