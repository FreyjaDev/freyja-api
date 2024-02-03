import { ulid } from 'ulidx';

import { JsonSerializable, OptionalId } from '../common/utility-types';
import { Timestamp, ULID, FNumber } from '../common/value-objects';
import { Entity } from '../interfaces/entity.interface';
import { userRatingSchema } from '../schemas';

export default class UserRating implements Entity {
  private constructor(
    readonly id: ULID,
    readonly createdAt: Timestamp,
    readonly updatedAt: Timestamp,
    readonly guildId: ULID,
    readonly rating: FNumber,
    readonly ratingTypeId: ULID,
    readonly userId: ULID,
  ) {}

  static create(userRating: OptionalId<typeof userRatingSchema.$inferInsert>) {
    const id = userRating.id ?? ulid();
    const now = new Date();
    const defaultRating = 1500;

    return new UserRating(
      ULID.of(id),
      Timestamp.of(userRating.createdAt || now),
      Timestamp.of(userRating.updatedAt || now),
      ULID.of(userRating.guildId),
      FNumber.of(userRating.rating || defaultRating),
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
