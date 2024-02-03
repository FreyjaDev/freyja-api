import { timestamp, varchar } from 'drizzle-orm/pg-core';

export const schemaBaseColumns = {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  id: varchar('ulid', { length: 26 }).primaryKey(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
};
