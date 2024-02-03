import { user as userSchema } from '@freyja-models/freyja-models';
import { OptionalId } from '@freyja-models/freyja-models/entities/base-entity';
import { Entity } from '@freyja-models/freyja-models/interfaces/entity.interface';
import { ulid } from 'ulidx';

import { JsonSerializable } from '../../../../src/common/interfaces/core/core';
import { ULID, Timestamp, SnowflakeId } from '../common/value-objects';

export default class User implements Entity {
  private constructor(
    readonly id: ULID,
    readonly createdAt: Timestamp,
    readonly updatedAt: Timestamp,
    readonly discordId: SnowflakeId,
  ) {}

  static create(user: OptionalId<typeof userSchema.$inferInsert>) {
    const id = user.id ?? ulid();
    const now = new Date();

    return new User(
      ULID.of(id),
      Timestamp.of(user.createdAt || now),
      Timestamp.of(user.updatedAt || now),
      SnowflakeId.of(user.discordId),
    );
  }

  unwrap(): JsonSerializable {
    return {
      createdAt: this.createdAt.value().getTime(),
      discordId: this.discordId.value(),
      id: this.id.value(),
      updatedAt: this.updatedAt.value().getTime(),
    };
  }
}
