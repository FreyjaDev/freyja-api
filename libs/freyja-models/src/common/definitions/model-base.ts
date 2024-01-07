import { bigserial, timestamp, varchar } from 'drizzle-orm/pg-core';

const modelBaseColumns = {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  ulid: varchar('ulid').notNull().unique(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
};

export default modelBaseColumns;
