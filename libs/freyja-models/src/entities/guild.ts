import { Entity } from '@freyja-models/freyja-models/entities/base-entity';

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

  static create(guild: typeof guildSchema.$inferInsert) {
    const now = new Date();

    return new Guild(
      new ULID(guild.id),
      new Timestamp(guild.createdAt || now),
      new Timestamp(guild.updatedAt || now),
      new SnowflakeId(guild.discordId),
    );
  }

  override unwrap(): Record<string, string | number | boolean> {
    return {
      createdAt: this.createdAt.value.getTime(),
      discordId: this.discordId.value,
      id: this.id.value,
      updatedAt: this.updatedAt.value.getTime(),
    };
  }
}
