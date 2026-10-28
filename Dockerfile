# syntax=docker/dockerfile:1.28
FROM node:24.22.1-trixie-slim@sha256:89c5244bc22a9bc3287d89ebc7e49b9cb5bb84cd40e6175ac3421d5a9f68b95a AS service

RUN apt-get update && apt-get upgrade -y

WORKDIR /

COPY package.json ./
COPY src/index.js ./

RUN npm install

EXPOSE 3000

USER node

CMD ["node", "index.js"]
