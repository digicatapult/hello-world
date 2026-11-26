# syntax=docker/dockerfile:1.29@sha256:572cebbc2b15e6f84c077742952674889cb63cd5e9b80abdffcbe587b6f19183
FROM node:26.13.1-trixie-slim@sha256:e6bedef217677b276c591795e169840edd9096dbf13f29df8ef8d1856b8820bc AS service

RUN apt-get update && apt-get upgrade -y

WORKDIR /

COPY package.json ./
COPY src/index.js ./

RUN npm install

EXPOSE 3000

USER node

CMD ["node", "index.js"]
