export interface DiscordUser {
  accent_color?: number;
  avatar?: string;
  avatar_decoration?: string;
  banner?: string;
  bot?: boolean;
  discriminator: string;
  email?: string;
  flags?: number;
  global_name: string;
  id: string;
  locale?: string;
  mfa_enabled?: boolean;
  premium_type?: number;
  public_flags?: number;
  system?: boolean;
  username: string;
  verified?: boolean;
}

export interface DiscordGuildMember {
  avatar?: string;
  communication_disabled_until?: string;
  deaf: boolean;
  flags?: number;
  joined_at: string;
  mute: boolean;
  nick?: string;
  pending?: boolean;
  permissions?: string;
  premium_since?: string;
  roles: string[];
  user?: DiscordUser;
}
