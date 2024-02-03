import { modelBaseColumns } from '@freyja-models/freyja-models/common/definitions/model-base';
import guildTable from '@freyja-models/freyja-models/schemas/guild';
import { pgTable, unique, varchar } from 'drizzle-orm/pg-core';

const ratingTypeTable = pgTable(
  'rating_type',
  {
    ...modelBaseColumns,
    guildId: varchar('guild_id', { length: 26 })
      .notNull()
      .references(() => guildTable.id, {
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

export default ratingTypeTable;
