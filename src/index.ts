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
      getGameResults(guildId, limit ?? 50, offset ?? 0),
    {
      query: t.Object({
        limit: t.Optional(t.Integer()),
        offset: t.Optional(t.Integer()),
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
      getGuildLeaderboard(guildId, limit ?? 50, offset ?? 0),
    {
      query: t.Object({
        limit: t.Optional(t.Integer()),
        offset: t.Optional(t.Integer()),
      }),
    },
  )
  .listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
