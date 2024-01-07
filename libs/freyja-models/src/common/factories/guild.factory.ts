import { GuildInterface } from '../interfaces/guild.interface';
import { BigSerialId, ULID, Timestamp, SnowflakeId } from '../value-objects';

export const guildFactory = (
  id: number,
  ulid: string,
  createdAt: Date,
  updatedAt: Date,
  discordId: string,
): GuildInterface => ({
  createdAt: new Timestamp(createdAt),
  discordId: new SnowflakeId(discordId),
  id: new BigSerialId(id),
  ulid: new ULID(ulid),
  updatedAt: new Timestamp(updatedAt),
});
