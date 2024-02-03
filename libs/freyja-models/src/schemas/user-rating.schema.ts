import { bigint, pgTable, varchar } from 'drizzle-orm/pg-core';

import { schemaBaseColumns } from '../common/schema';

import guildTable from './guild.schema';
import ratingTypeTable from './rating-type.schema';
import userTable from './user.schema';

const userRatingSchema = pgTable('user_rating', {
  ...schemaBaseColumns,
  guildId: varchar('guild_id', { length: 26 })
    .notNull()
    .references(() => guildTable.id, { onDelete: 'cascade' }),
  rating: bigint('rating', { mode: 'number' }).notNull().default(1500),
  ratingTypeId: varchar('rating_type_id', { length: 26 })
    .notNull()
    .references(() => ratingTypeTable.id, { onDelete: 'cascade' }),
  userId: varchar('user_id', { length: 26 })
    .notNull()
    .references(() => userTable.id),
});

export default userRatingSchema;
