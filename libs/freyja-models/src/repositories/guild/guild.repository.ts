import Guild from '@freyja-models/freyja-models/entities/guild';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { SnowflakeId } from '../../common/value-objects';
import { guildTable as guildSchema } from '../../models/guild';

@Injectable()
export class GuildRepository {
  constructor(
    @Inject('DATABASE') private readonly database: PostgresJsDatabase,
  ) {}
  async delete(guild: Guild): Promise<void> {
    await this.database
      .delete(guildSchema)
      .where(eq(guildSchema.id, guild.id.value()));
  }

  async findBySnowflakeId(
    snowflakeId: SnowflakeId,
  ): Promise<Guild | undefined> {
    const records = await this.database
      .select()
      .from(guildSchema)
      .where(eq(guildSchema.discordId, snowflakeId.value()));

    if (records.length === 0) {
      return undefined;
    }

    const record = records[0];

    return Guild.create({
      createdAt: record.createdAt,
      discordId: record.discordId,
      id: record.id,
      updatedAt: record.updatedAt,
    });
  }

  async save(guild: Guild): Promise<void> {
    await this.database
      .insert(guildSchema)
      .values({
        createdAt: guild.createdAt.value(),
        discordId: guild.discordId.value(),
        id: guild.id.value(),
        updatedAt: guild.updatedAt.value(),
      })
      .onConflictDoUpdate({
        set: {
          discordId: guild.discordId.value(),
          updatedAt: guild.updatedAt.value(),
        },
        target: guildSchema.id,
      });
  }
}
