import { SnowflakeId } from '../../common/value-objects';
import User from '../../entities/user';

export interface IUserRepository {
  delete(guild: User): Promise<void>;
  findBySnowflakeId(snowflakeId: SnowflakeId): Promise<User | undefined>;
  save(guild: User): Promise<void>;
}
