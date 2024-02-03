import { ulid } from 'ulidx';

import { OptionalId, JsonSerializable } from '../common/utility-types';
import { ULID, Timestamp, SnowflakeId } from '../common/value-objects';
import { Entity } from '../interfaces/entity.interface';
import { guildSchema } from '../schemas';

export default class Guild implements Entity {
  private constructor(
    readonly id: ULID,
    readonly createdAt: Timestamp,
    readonly updatedAt: Timestamp,
    readonly discordId: SnowflakeId,
  ) {}

  static create(guild: OptionalId<typeof guildSchema.$inferInsert>) {
    const id = guild.id ?? ulid();
    const now = new Date();

    return new Guild(
      ULID.of(id),
      Timestamp.of(guild.createdAt || now),
      Timestamp.of(guild.updatedAt || now),
      SnowflakeId.of(guild.discordId),
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
