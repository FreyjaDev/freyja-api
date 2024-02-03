import { modelBaseColumns } from '@freyja-models/freyja-models/common/definitions/model-base';
import guildTable from '@freyja-models/freyja-models/schemas/guild';
import ratingTypeTable from '@freyja-models/freyja-models/schemas/rating-type';
import userTable from '@freyja-models/freyja-models/schemas/user';
import { bigint, pgTable, varchar } from 'drizzle-orm/pg-core';

const userRatingTable = pgTable('user_rating', {
  ...modelBaseColumns,
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

export default userRatingTable;
