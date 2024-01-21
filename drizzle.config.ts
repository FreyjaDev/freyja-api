import type { Config } from 'drizzle-kit';

export default {
  dbCredentials: {
    database: process.env.POSTGRES_DB ?? '',
    host: process.env.POSTGRES_HOST ?? '',
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
  },
  driver: 'pg',
  out: './libs/freyja-models/src/drizzle',
  schema: './libs/freyja-models/src/models',
} satisfies Config;
