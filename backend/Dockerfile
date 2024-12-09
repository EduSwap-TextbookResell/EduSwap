FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .

EXPOSE ${SERVER_PORT}

# DEVELOPMENT

FROM base AS development

CMD [ "pnpm", "run", "dev" ]

# PRODUCTION

FROM base AS production

CMD [ "pnpm", "run", "start" ]
