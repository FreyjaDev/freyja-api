import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { schemaBaseColumns } from '../common/schema';

const guildSchema = pgTable('guild', {
  ...schemaBaseColumns,
  discordId: varchar('discord_id', { length: 20 }).unique().notNull(),
});

export default guildSchema;
