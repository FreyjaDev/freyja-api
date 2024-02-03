import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { schemaBaseColumns } from '../common/schema';

import guildSchema from './guild.schema';
import ratingTypeSchema from './rating-type.schema';
import userSchema from './user.schema';

const gameResultSchema = pgTable('game_result', {
  ...schemaBaseColumns,
  guildId: varchar('guild_id', { length: 26 })
    .notNull()
    .references(() => guildSchema.id, { onDelete: 'cascade' }),
  loserUserId: varchar('loser_user_id', { length: 26 })
    .notNull()
    .references(() => userSchema.id),
  ratingTypeId: varchar('rating_type_id', { length: 26 })
    .notNull()
    .references(() => ratingTypeSchema.id, { onDelete: 'cascade' }),
  winnerUserId: varchar('winner_user_id', { length: 26 })
    .notNull()
    .references(() => userSchema.id),
});

export default gameResultSchema;
