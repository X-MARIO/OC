FROM node:20.9.0 as node

RUN npm install -g npm@9.8.1

WORKDIR /app

COPY package*.json ./

COPY decorate-angular-cli.js ./

RUN npm ci --froce

COPY . .

RUN npm run build:frontend

FROM nginx:1.25.2-alpine

COPY --from=node /app/dist/frontend/browser /usr/share/nginx/html
