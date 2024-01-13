import Guild from '@freyja-models/freyja-models/entities/guild';

import { SnowflakeId } from '../../common/value-objects';

export interface IGuildRepository {
  delete(guild: Guild): Promise<void>;
  findBySnowflakeId(snowflakeId: SnowflakeId): Promise<Guild | undefined>;
  save(guild: Guild): Promise<void>;
}
