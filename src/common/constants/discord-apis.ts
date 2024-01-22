const base = 'https://discord.com/api/v10';

export const discordApis = {
  guild: {
    byId: {
      members: `${base}/guilds/{guildId}/members`,
    },
  },
};
