import { ULID, Timestamp, SnowflakeId } from '../common/value-objects';
import { user as userSchema } from '../models/user';

export default class User {
  private constructor(
    readonly id: ULID,
    readonly createdAt: Timestamp,
    readonly updatedAt: Timestamp,
    readonly discordId: SnowflakeId,
  ) {}

  static create(guild: typeof userSchema.$inferInsert) {
    const now = new Date();

    return new User(
      new ULID(guild.id),
      new Timestamp(guild.createdAt || now),
      new Timestamp(guild.updatedAt || now),
      new SnowflakeId(guild.discordId),
    );
  }
}
