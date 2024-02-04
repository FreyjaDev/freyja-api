import { ulid } from 'ulidx';

import { OptionalId, JsonSerializable } from '../common/utility-types';
import { GeneralString, Timestamp, ULID } from '../common/value-objects';
import { Entity } from '../interfaces/entity.interface';
import { ratingTypeSchema } from '../schemas';

export default class RatingType implements Entity {
  private constructor(
    readonly id: ULID,
    readonly guildId: ULID,
    readonly name: GeneralString,
    readonly createdAt: Timestamp,
    readonly updatedAt: Timestamp,
  ) {}

  static create(ratingType: OptionalId<typeof ratingTypeSchema.$inferInsert>) {
    const id = ratingType.id ?? ulid();
    const now = new Date();

    return new RatingType(
      ULID.of(id),
      ULID.of(ratingType.guildId),
      GeneralString.of(ratingType.name),
      Timestamp.of(ratingType.createdAt || now),
      Timestamp.of(ratingType.updatedAt || now),
    );
  }

  unwrap(): JsonSerializable {
    return {
      createdAt: this.createdAt.value(),
      guildId: this.guildId.value(),
      id: this.id.value(),
      name: this.name.value(),
      updatedAt: this.updatedAt.value(),
    };
  }
}
