import modelBaseColumns from '@freyja-models/freyja-models/common/definitions/model-base';
import guild from '@freyja-models/freyja-models/models/guild';
import { bigint, pgTable, unique, varchar } from 'drizzle-orm/pg-core';

const ratingType = pgTable(
  'rating_type',
  {
    ...modelBaseColumns,
    guildId: bigint('guild_id', { mode: 'number' })
      .notNull()
      .references(() => guild.id, {
        onDelete: 'CASCADE',
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

export default ratingType;
