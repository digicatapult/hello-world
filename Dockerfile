# syntax=docker/dockerfile:1.29@sha256:572cebbc2b15e6f84c077742952674889cb63cd5e9b80abdffcbe587b6f19183
FROM node:26.13.0-trixie-slim@sha256:5adad64f9a1fca2d51972caa65983634c8a774eb300d72b20f7f2a0f60368072 AS service

RUN apt-get update && apt-get upgrade -y

WORKDIR /

COPY package.json ./
COPY src/index.js ./

RUN npm install

EXPOSE 3000

USER node

CMD ["node", "index.js"]
