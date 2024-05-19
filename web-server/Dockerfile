FROM node:20.13.0-slim

WORKDIR /web-server
COPY ./app/package.json ./app/package-lock.json ./
RUN npm install

COPY ./app .