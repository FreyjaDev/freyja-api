import postgres from 'postgres';
import * as process from 'process';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate as drizzleMigrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from '../src/models/schemas';

const userName = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;
const port = process.env.POSTGRES_PORT;
const database = process.env.POSTGRES_DB;

const connectionUrl = `postgres://${userName}:${password}@${host}:${port}/${database}`;

export const migrate = async () => {
  const migrationClient = postgres(connectionUrl, { max: 1 });
  const migrationDB = drizzle(migrationClient, { schema });
  await drizzleMigrate(migrationDB, { migrationsFolder: './drizzle' });

  await migrationClient.end();
};

await migrate();
