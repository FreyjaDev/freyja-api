import { ULID, Timestamp, SnowflakeId } from '../common/value-objects';
import { user as userSchema } from '../models/user';

export default class User {
  private constructor(
    readonly id: ULID,
    readonly createdAt: Timestamp,
    readonly updatedAt: Timestamp,
    readonly discordId: SnowflakeId,
  ) {}

  static create(user: typeof userSchema.$inferInsert) {
    const now = new Date();

    return new User(
      ULID.of(user.id),
      Timestamp.of(user.createdAt || now),
      Timestamp.of(user.updatedAt || now),
      SnowflakeId.of(user.discordId),
    );
  }
}
