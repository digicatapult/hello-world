# syntax=docker/dockerfile:1.20
FROM dhi.io/node:24-debian13-dev AS modules

WORKDIR /app

COPY package*.json ./

RUN npm install

FROM dhi.io/node:24-debian13 AS service

WORKDIR /app

COPY src/index.js ./
COPY --from=modules /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "index.js"]
