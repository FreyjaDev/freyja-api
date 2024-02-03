import { Inject, Injectable } from '@nestjs/common';
import { eq, inArray } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { SnowflakeId } from '../../common/value-objects';
import User from '../../entities/user';
import { user as userSchema } from '../../models/user';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('DATABASE') private readonly database: PostgresJsDatabase,
  ) {}

  async delete(user: User): Promise<void> {
    await this.database
      .delete(userSchema)
      .where(eq(userSchema.id, user.id.value()));
  }

  async findAllBySnowflakeIds(snowflakeIds: SnowflakeId[]): Promise<User[]> {
    const records = await this.database
      .select()
      .from(userSchema)
      .where(
        inArray(
          userSchema.discordId,
          snowflakeIds.map((sid) => sid.value()),
        ),
      );

    return records.map((record) =>
      User.create({
        createdAt: record.createdAt,
        discordId: record.discordId,
        id: record.id,
        updatedAt: record.updatedAt,
      }),
    );
  }

  async findBySnowflakeId(snowflakeId: SnowflakeId): Promise<User | undefined> {
    const records = await this.database
      .select()
      .from(userSchema)
      .where(eq(userSchema.discordId, snowflakeId.value()));

    if (records.length === 0) {
      return undefined;
    }

    const record = records[0];

    return User.create({
      createdAt: record.createdAt,
      discordId: record.discordId,
      id: record.id,
      updatedAt: record.updatedAt,
    });
  }

  async save(user: User): Promise<void> {
    await this.database
      .insert(userSchema)
      .values({
        createdAt: user.createdAt.value(),
        discordId: user.discordId.value(),
        id: user.id.value(),
        updatedAt: user.updatedAt.value(),
      })
      .onConflictDoUpdate({
        set: {
          discordId: user.discordId.value(),
          updatedAt: user.updatedAt.value(),
        },
        target: userSchema.discordId,
      });
  }

  async saveAll(users: User[]): Promise<void> {
    await this.database.insert(userSchema).values(
      users.map((user) => ({
        createdAt: user.createdAt.value(),
        discordId: user.discordId.value(),
        id: user.id.value(),
        updatedAt: user.updatedAt.value(),
      })),
    );
  }
}
