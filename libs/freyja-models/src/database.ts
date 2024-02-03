import process from 'process';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schemas';

export const psql = postgres({
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
});

export const database = drizzle(psql, { schema });
