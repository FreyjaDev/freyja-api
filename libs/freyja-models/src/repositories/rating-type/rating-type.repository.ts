import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { SnowflakeId, ULID } from '../../common/value-objects';
import { RatingType } from '../../entities';
import { guildSchema, ratingTypeSchema } from '../../schemas';

@Injectable()
export class RatingTypeRepository {
  constructor(
    @Inject('DATABASE') private readonly database: PostgresJsDatabase,
  ) {}

  async delete(ratingType: RatingType): Promise<void> {
    await this.database
      .delete(ratingTypeSchema)
      .where(eq(ratingTypeSchema.id, ratingType.id.value()));
  }

  async findAllByGuildId(guildId: SnowflakeId): Promise<RatingType[]> {
    const records = await this.database
      .select({ ratingType: ratingTypeSchema })
      .from(guildSchema)
      .innerJoin(ratingTypeSchema, eq(guildSchema.id, ratingTypeSchema.guildId))
      .where(eq(guildSchema.discordId, guildId.value()));

    return records.map((record) => {
      return RatingType.create({
        createdAt: new Date(record.ratingType.createdAt),
        guildId: record.ratingType.guildId,
        id: record.ratingType.id,
        name: record.ratingType.name,
        updatedAt: new Date(record.ratingType.updatedAt),
      });
    });
  }

  async findById(
    guildId: SnowflakeId,
    ratingTypeId: ULID,
  ): Promise<RatingType | undefined> {
    const records = await this.database
      .select({ ratingType: ratingTypeSchema })
      .from(ratingTypeSchema)
      .innerJoin(guildSchema, eq(ratingTypeSchema.guildId, guildSchema.id))
      .where(
        and(
          eq(ratingTypeSchema.id, ratingTypeId.value()),
          eq(guildSchema.discordId, guildId.value()),
        ),
      );

    if (records.length <= 0) {
      return undefined;
    }

    const ratingType = records[0].ratingType;

    return RatingType.create({
      createdAt: new Date(ratingType.createdAt),
      guildId: ratingType.guildId,
      id: ratingType.id,
      name: ratingType.name,
      updatedAt: new Date(ratingType.updatedAt),
    });
  }

  async save(ratingType: RatingType): Promise<void> {
    await this.database
      .insert(ratingTypeSchema)
      .values({
        createdAt: ratingType.createdAt.value(),
        guildId: ratingType.guildId.value(),
        id: ratingType.id.value(),
        name: ratingType.name.value(),
        updatedAt: ratingType.updatedAt.value(),
      })
      .onConflictDoUpdate({
        set: {
          name: ratingType.name.value(),
          updatedAt: ratingType.updatedAt.value(),
        },
        target: [ratingTypeSchema.guildId, ratingTypeSchema.name],
      });
  }
}
