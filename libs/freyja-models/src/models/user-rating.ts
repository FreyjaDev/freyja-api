import { modelBaseColumns } from '@freyja-models/freyja-models/common/definitions/model-base';
import guild from '@freyja-models/freyja-models/models/guild';
import ratingType from '@freyja-models/freyja-models/models/rating-type';
import user from '@freyja-models/freyja-models/models/user';
import { bigint, pgTable, varchar } from 'drizzle-orm/pg-core';

const userRating = pgTable('user_rating', {
  ...modelBaseColumns,
  guildId: varchar('guild_id', { length: 26 })
    .notNull()
    .references(() => guild.id, { onDelete: 'cascade' }),
  rating: bigint('rating', { mode: 'number' }).notNull().default(1500),
  ratingTypeId: varchar('rating_type_id', { length: 26 })
    .notNull()
    .references(() => ratingType.id, { onDelete: 'cascade' }),
  userId: varchar('user_id', { length: 26 })
    .notNull()
    .references(() => user.id),
});

export default userRating;
