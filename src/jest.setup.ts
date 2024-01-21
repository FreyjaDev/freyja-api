import process from 'process';

import * as schema from '@freyja-models/freyja-models/models';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

let psql: postgres.Sql;
let db: PostgresJsDatabase<typeof schema>;
let rollBackTransaction: () => void;

jest.mock('@freyja-models/freyja-models/database', () => ({
  database: undefined,
}));

beforeAll(() => {
  psql = postgres({
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
  });
  db = drizzle(psql, { schema });
});

afterAll(async () => {
  await psql.end();
});

beforeEach(() => {
  return new Promise<void>((resolve) => {
    db.transaction((tx) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const originalDb = require('@freyja-models/freyja-models/database');
      originalDb['database'] = tx;
      resolve();

      return new Promise((_, reject) => {
        rollBackTransaction = reject;
      });
    }).catch(() => {});
  });
});

afterEach(() => {
  rollBackTransaction();
});
