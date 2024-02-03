import { database } from '@freyja-models/freyja-models/database';
import Guild from '@freyja-models/freyja-models/entities/guild';
import { guildTable as guildSchema } from '@freyja-models/freyja-models/schemas/guild';

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
