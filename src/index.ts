import 'core-js';
import 'reflect-metadata';
import { Elysia, t } from 'elysia';
import {
  getGameResults,
  postGameResult,
} from './controllers/guilds/games.controller';

const app = new Elysia()
  .post('/guilds/:guildId/users', () => {})
  .get('/guilds/:guildId/users/@me', () => {})
  .get('/guilds/:guildId/users/:userId', () => {})
  .get('/guilds/:guildId/users/@me/games', () => {})
  .get('/guilds/:guildId/users/:userId/games', () => {})
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
  .get('/guilds/:guildId/leaderboard', () => {})
  .listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
