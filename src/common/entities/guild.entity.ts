import { Entity } from '../utils/entity';
import { DiscordId } from '../values/discord-id';
import { GuildId } from '../values/guild-id';

interface GuildProps {
  discordId: DiscordId;
  guildId: GuildId;
}

export class Guild extends Entity<GuildProps> {
  get discordId(): DiscordId {
    return this.props.discordId;
  }

  get guildId(): GuildId {
    return this.props.guildId;
  }

  protected isEqual(entity: Guild): boolean {
    return (
      this.props.discordId.equals(entity.discordId) &&
      this.props.guildId.equals(entity.guildId)
    );
  }
}
