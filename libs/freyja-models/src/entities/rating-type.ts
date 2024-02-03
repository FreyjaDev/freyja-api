import { GeneralString, Timestamp, ULID } from '@freyja-models/freyja-models';
import { OptionalId } from '@freyja-models/freyja-models/entities/base-entity';
import { Entity } from '@freyja-models/freyja-models/interfaces/entity.interface';
import { ulid } from 'ulidx';

import { JsonSerializable } from '../../../../src/common/interfaces/core/core';
import { ratingTypeTable as ratingTypeSchema } from '../models';

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
      createdAt: this.createdAt.value,
      guildId: this.guildId.value,
      id: this.id.value,
      name: this.name.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
