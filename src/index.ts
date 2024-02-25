import { Elysia } from 'elysia';

const app = new Elysia()
  .group('guild', (app) => {
    return app;
  })
  .get('/', () => 'Hello Elysia')
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
