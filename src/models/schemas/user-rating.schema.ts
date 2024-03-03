import {
  index,
  integer,
  pgTable,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const userRatingSchema = pgTable(
  'user_rating',
  {
    id: uuid('id').primaryKey(),
    userId: varchar('user_id', { length: 20 }).notNull(),
    guildId: varchar('guild_id', { length: 20 }).notNull(),
    rating: integer('rating').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    uniqueRating: unique().on(table.guildId, table.userId),
    ratingIndex: index().on(table.guildId, table.userId, table.rating),
  }),
);
