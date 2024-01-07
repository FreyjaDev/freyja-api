import { guild as guildSchema } from '../../models/guild';
import { ULID, Timestamp, SnowflakeId } from '../value-objects';

export default class Guild {
  private constructor(
    readonly id: ULID,
    readonly createdAt: Timestamp,
    readonly updatedAt: Timestamp,
    readonly discordId: SnowflakeId,
  ) {}

  static create(guild: typeof guildSchema.$inferInsert) {
    const now = new Date();

    return new Guild(
      new ULID(guild.id),
      new Timestamp(guild.createdAt || now),
      new Timestamp(guild.updatedAt || now),
      new SnowflakeId(guild.discordId),
    );
  }
}
