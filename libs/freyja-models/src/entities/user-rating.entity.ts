import { ulid } from 'ulidx';

import { JsonSerializable, OptionalId } from '../common/utility-types';
import { Timestamp, ULID, Number } from '../common/value-objects';
import { Entity } from '../interfaces/entity.interface';
import { userRatingSchema } from '../schemas';

export default class UserRating implements Entity {
  private constructor(
    readonly id: ULID,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly guildId: ULID,
    readonly rating: number,
    readonly ratingTypeId: ULID,
    readonly userId: ULID,
  ) {}

  static create(userRating: OptionalId<typeof userRatingSchema.$inferInsert>) {
    const id = userRating.id ?? ulid();
    const now = new Date();

    return new UserRating(
      ULID.of(id),
      Timestamp.of(userRating.createdAt || now),
      Timestamp.of(userRating.updatedAt || now),
      ULID.of(userRating.guildId),
      Number.of(userRating.rating),
      ULID.of(userRating.ratingTypeId),
      ULID.of(userRating.userId),
    );
  }

  unwrap(): JsonSerializable {
    return {
      createdAt: this.createdAt.value().getTime(),
      guildId: this.guildId.value(),
      id: this.id.value(),
      rating: this.rating.value(),
      ratingTypeId: this.ratingTypeId.value(),
      updatedAt: this.updatedAt.value().getTime(),
      userId: this.userId.value(),
    };
  }
}
