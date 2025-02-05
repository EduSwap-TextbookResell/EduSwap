FROM node:23-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .

EXPOSE ${CLIENT_PORT}

# DEVELOPMENT

FROM base AS development

CMD [ "pnpm", "run", "dev" ]

# PRODUCTION

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm run build

FROM base AS production
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

CMD [ "pnpm", "run", "preview" ]
