import {
  Entity,
  OmitId,
} from '@freyja-models/freyja-models/entities/base-entity';
import { ulid } from 'ulidx';

import { JsonSerializable } from '../../../../src/common/interfaces/core/core';
import { ULID, Timestamp, SnowflakeId } from '../common/value-objects';
import { guild as guildSchema } from '../models/guild';

export default class Guild extends Entity {
  private constructor(
    readonly id: ULID,
    readonly createdAt: Timestamp,
    readonly updatedAt: Timestamp,
    readonly discordId: SnowflakeId,
  ) {
    super();
  }

  static create(guild: OmitId<typeof guildSchema.$inferInsert>) {
    const id = ulid();
    const now = new Date();

    return new Guild(
      ULID.of(id),
      Timestamp.of(guild.createdAt || now),
      Timestamp.of(guild.updatedAt || now),
      SnowflakeId.of(guild.discordId),
    );
  }

  override unwrap(): JsonSerializable {
    return {
      createdAt: this.createdAt.value().getTime(),
      discordId: this.discordId.value(),
      id: this.id.value(),
      updatedAt: this.updatedAt.value().getTime(),
    };
  }
}
