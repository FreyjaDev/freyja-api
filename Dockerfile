FROM --platform=linux/arm64 oven/bun:1.0.29-slim AS base
WORKDIR /usr/src/app

FROM base AS install-deps
RUN mkdir -p /temp/dev
COPY ./package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production --ignore-scripts

FROM base AS prerelease
COPY --from=install-deps /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build

FROM base AS release
COPY --from=install-deps /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/build/index.js .
COPY --from=prerelease /usr/src/app/package.json .

USER bun
EXPOSE 3000
ENTRYPOINT [ "bun", "run", "index.js" ]