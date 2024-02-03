import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { RatingType } from '../../entities';
import { ratingTypeSchema } from '../../schemas';

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
