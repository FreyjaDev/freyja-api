import RatingType from '@freyja-models/freyja-models/entities/rating-type';
import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { ratingTypeTable as ratingTypeSchema } from '../../schemas';

@Injectable()
export class RatingTypeRepository {
  constructor(
    @Inject('DATABASE') private readonly database: PostgresJsDatabase,
  ) {}

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