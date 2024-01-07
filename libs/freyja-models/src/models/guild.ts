import modelBaseColumns from '@freyja-models/freyja-models/common/definitions/model-base';
import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const guild = pgTable('guild', {
  ...modelBaseColumns,
  discordId: varchar('discord_id', { length: 20 }).unique().notNull(),
});

export default guild;
