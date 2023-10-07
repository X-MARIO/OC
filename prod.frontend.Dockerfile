FROM node:20.2.0-alpine3.16 as node

RUN npm install -g npm@9.3.0

WORKDIR /app

COPY package*.json ./

COPY decorate-angular-cli.js ./

RUN npm ci

COPY . .

RUN npm run build:frontend

FROM nginx:1.25.2-alpine

COPY --from=node /app/dist/frontend/browser /usr/share/nginx/html
