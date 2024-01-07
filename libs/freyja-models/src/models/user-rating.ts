import modelBaseColumns from '@freyja-models/freyja-models/common/definitions/model-base';
import guild from '@freyja-models/freyja-models/models/guild';
import ratingType from '@freyja-models/freyja-models/models/rating-type';
import user from '@freyja-models/freyja-models/models/user';
import { bigint, pgTable } from 'drizzle-orm/pg-core';

const userRating = pgTable('user_rating', {
  ...modelBaseColumns,
  guildId: bigint('guild_id', { mode: 'number' })
    .notNull()
    .references(() => guild.id, { onDelete: 'cascade' }),
  rating: bigint('rating', { mode: 'number' }).notNull().default(1500n),
  ratingTypeId: bigint('rating_type_id')
    .notNull()
    .references(() => ratingType.id, { onDelete: 'cascade' }),
  userId: bigint('user_id', { mode: 'number' })
    .notNull()
    .references(() => user.id),
});

export default userRating;
