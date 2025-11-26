# syntax=docker/dockerfile:1.20
FROM node:24-trixie-slim AS service

RUN apt-get update && apt-get upgrade -y

WORKDIR /app

COPY package.json ./
COPY index.js ./

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]
