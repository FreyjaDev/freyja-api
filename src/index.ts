import { Elysia } from 'elysia';

const app = new Elysia()
  .post('/guilds/:guildId/users', () => {})
  .get('/guilds/:guildId/users/@me', () => {})
  .get('/guilds/:guildId/users/:userId', () => {})
  .get('/guilds/:guildId/users/@me/games', () => {})
  .get('/guilds/:guildId/users/:userId/games', () => {})
  .get('/guilds/:guildId/games', () => {})
  .post('/guilds/:guildId/games', () => {})
  .get('/guilds/:guildId/leaderboard', () => {})
  .listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
