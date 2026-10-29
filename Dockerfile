# syntax=docker/dockerfile:1.28@sha256:bb22d9815c728170f72750f4e5b0d672e06176142e1d602c7e66c050100b7e5b
FROM node:24.22.2-trixie-slim@sha256:54f84b4cf8432b21aaffd5d3ce8d41e12cea0d10d33c09d2f3c9879d49d6b446 AS service

RUN apt-get update && apt-get upgrade -y

WORKDIR /

COPY package.json ./
COPY src/index.js ./

RUN npm install

EXPOSE 3000

USER node

CMD ["node", "index.js"]
