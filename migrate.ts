import { database, psql } from '@freyja-models/freyja-models/database';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

const migrateDb = async () => {
  await migrate(database, {
    migrationsFolder: './libs/freyja-models/src/drizzle',
  });
};

migrateDb().finally(() => {
  psql.end().then();
});
