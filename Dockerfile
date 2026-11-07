# syntax=docker/dockerfile:1.28@sha256:bb22d9815c728170f72750f4e5b0d672e06176142e1d602c7e66c050100b7e5b
FROM node:26.13.0-trixie-slim@sha256:5adad64f9a1fca2d51972caa65983634c8a774eb300d72b20f7f2a0f60368072 AS service

RUN apt-get update && apt-get upgrade -y

WORKDIR /

COPY package.json ./
COPY src/index.js ./

RUN npm install

EXPOSE 3000

USER node

CMD ["node", "index.js"]
