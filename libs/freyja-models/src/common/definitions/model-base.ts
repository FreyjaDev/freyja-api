import { bigserial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const modelBaseColumns = {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  ulid: varchar('ulid').notNull().unique(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
};
