import Guild from '../../common/entities/guild';
import { SnowflakeId } from '../../common/value-objects';

export interface IGuildRepository {
  delete(guild: Guild): Promise<void>;
  findBySnowflakeId(snowflakeId: SnowflakeId): Promise<Guild | null>;
  save(guild: Guild): Promise<void>;
}