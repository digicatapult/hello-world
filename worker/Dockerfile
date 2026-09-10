# syntax=docker/dockerfile:1.27
FROM node:24-trixie-slim AS build

WORKDIR /app

COPY worker/package.json package.json
COPY worker/tsconfig.json tsconfig.json
COPY worker/src src
COPY worker/test test

RUN npm install
RUN npm run build

FROM node:24-trixie-slim

WORKDIR /app

COPY --from=build /app/dist ./dist

USER node

CMD ["node", "dist/src/index.js"]