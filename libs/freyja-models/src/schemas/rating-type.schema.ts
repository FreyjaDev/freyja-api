import { pgTable, unique, varchar } from 'drizzle-orm/pg-core';

import { schemaBaseColumns } from '../common/schema';

import guildSchema from './guild.schema';

const ratingTypeSchema = pgTable(
  'rating_type',
  {
    ...schemaBaseColumns,
    guildId: varchar('guild_id', { length: 26 })
      .notNull()
      .references(() => guildSchema.id, {
        onDelete: 'cascade',
      }),
    name: varchar('name', { length: 255 }).notNull(),
  },
  (table) => {
    return {
      uniqueNamePerGuild: unique('unique_name_per_guild')
        .on(table.guildId, table.name)
        .nullsNotDistinct(),
    };
  },
);

export default ratingTypeSchema;
