import {
  BigSerialId,
  SnowflakeId,
  ULID,
  Timestamp,
} from '@freyja-models/freyja-models';

export interface GuildInterface {
  createdAt: Timestamp;
  discordId: SnowflakeId;
  id: BigSerialId;
  ulid: ULID;
  updatedAt: Timestamp;
}
