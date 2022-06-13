FROM node:17

RUN yarn global add @vue/cli

COPY package.json .

RUN yarn install

COPY . .