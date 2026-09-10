# syntax=docker/dockerfile:1.27
FROM node:24-trixie-slim AS service

WORKDIR /app

COPY portal/package.json package.json

RUN npm install

COPY portal/src src

USER node

CMD ["node", "src/index.js"]