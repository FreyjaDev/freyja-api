import 'core-js';
import 'reflect-metadata';
import { Elysia, t } from 'elysia';
import {
  getGameResults,
  postGameResult,
} from './controllers/guilds/games.controller';
import { getGuildMemberRating } from './controllers/guilds/users.controller';
import { getGuildLeaderboard } from './controllers/guilds/guilds.controller';

const app = new Elysia()
  .get('/guilds/:guildId/users/:userId', ({ params: { guildId, userId } }) =>
    getGuildMemberRating(guildId, userId),
  )
  .get(
    '/guilds/:guildId/games',
    ({ params: { guildId }, query: { limit, offset } }) =>
      getGameResults(guildId, limit, offset),
    {
      query: t.Object({
        limit: t.Integer({ default: 50 }),
        offset: t.Integer({ default: 0 }),
      }),
    },
  )
  .post(
    '/guilds/:guildId/games',
    ({ params: { guildId }, body: { winUserId, loseUserId } }) =>
      postGameResult(guildId, winUserId, loseUserId),
    {
      body: t.Object({
        winUserId: t.String(),
        loseUserId: t.String(),
      }),
    },
  )
  .get(
    '/guilds/:guildId/leaderboard',
    ({ params: { guildId }, query: { limit, offset } }) =>
      getGuildLeaderboard(guildId, limit, offset),
    {
      query: t.Object({
        limit: t.Integer({ default: 50 }),
        offset: t.Integer({ default: 0 }),
      }),
    },
  )
  .listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
