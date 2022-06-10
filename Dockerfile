FROM node:17

RUN yarn global add @vue/cli

RUN mkdir app

WORKDIR /app

COPY . app/

RUN yarn install