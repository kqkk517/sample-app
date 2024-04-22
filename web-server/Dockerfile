FROM node:lts

WORKDIR /web-server
COPY ./app/package.json ./app/package-lock.json ./
RUN npm install

COPY ./app .