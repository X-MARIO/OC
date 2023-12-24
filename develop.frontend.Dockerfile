FROM node:20.9.0 as development

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

COPY decorate-angular-cli.js ./

RUN npm i npm@9.8.1 -g

RUN npm i nx@17.2.7 -g

RUN npm i @nx/nx-linux-x64-gnu@17.2.7 -g

RUN npm i @nx/nx-linux-x64-musl@17.2.7 -g

RUN npm ci

COPY . .

EXPOSE 4200 49153

CMD ["npm", "run", "start:frontend"]
