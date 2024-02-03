import { database } from './database';
import Guild from './entities/guild';
import { guildSchema } from './schemas';

export const guildFactory = async (guild: typeof guildSchema.$inferInsert) => {
  const now = new Date();
  now.setMilliseconds(0);
  await database.insert(guildSchema).values({
    createdAt: guild.createdAt ?? now,
    discordId: guild.discordId,
    id: guild.id,
    updatedAt: guild.updatedAt ?? now,
  });
  return Guild.create({
    ...guild,
    createdAt: guild.createdAt ?? now,
    updatedAt: guild.updatedAt ?? now,
  });
};
