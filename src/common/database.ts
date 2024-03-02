import postgres from 'postgres';
import * as process from 'process';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate as drizzleMigrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from '../models/schemas';

const userName = process.env.FREYJA_DB_USER;
const password = process.env.FREYJA_DB_PASSWORD;
const host = process.env.FREYJA_DB_HOST;
const port = process.env.FREYJA_DB_PORT;
const database = process.env.FREYJA_DB_NAME;

const connectionUrl = `postgres://${userName}:${password}@${host}:${port}/${database}`;
const queryClient = postgres(connectionUrl);

export const db = drizzle(queryClient, { schema });

export const migrate = async () => {
  const migrationClient = postgres(connectionUrl, { max: 1 });
  const migrationDB = drizzle(migrationClient, { schema });
  await drizzleMigrate(migrationDB, { migrationsFolder: './migrations' });
};
