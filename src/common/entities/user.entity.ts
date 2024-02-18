import { Entity } from '../utils/entity';
import { DiscordId } from '../values/discord-id';
import { UserId } from '../values/user-id';

interface UserProps {
  discordId: DiscordId;
  userId: UserId;
}

export class User extends Entity<UserProps> {
  get userId(): UserId {
    return this.props.userId;
  }

  get discordId(): DiscordId {
    return this.props.discordId;
  }

  protected isEqual(entity: User): boolean {
    return (
      this.props.discordId.equals(entity.discordId) &&
      this.props.userId.equals(entity.userId)
    );
  }
}
