import { SnowflakeId } from '@freyja-models/freyja-models';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

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
