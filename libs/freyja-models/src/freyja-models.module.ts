import * as process from 'process';

import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const database = drizzle(
  postgres({
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
  }),
);

@Module({
  exports: [],
  providers: [
    {
      provide: 'DATABASE',
      useValue: database,
    },
  ],
})
export class FreyjaModelsModule {}
