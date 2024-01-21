FROM --platform=linux/arm64 node:20-bookworm-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS sources

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install -g @nestjs/cli && pnpm install --frozen-lockfile

COPY environments environments
COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY libs libs
COPY src src

FROM sources AS builder

WORKDIR /app

RUN pnpm run -r build

FROM --platform=linux/arm64 node:lts-alpine3.19

WORKDIR /app

COPY --from=builder /app/dist ./
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "main"]