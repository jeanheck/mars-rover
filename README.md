# mars-rovers

## With Docker (recommended if you only want to check the app working)
PS: this assume you have Docker and docker-compose installed

### Serve your application

```
docker-compose up
```

### Run tests

```
docker exec mars-rovers-app yarn run test:unit
```

## Without Docker
PS: Vue CLI 4.x requires Node.js version 8.9 or above (v10+ recommended). You can manage multiple versions of Node on the same machine with n, nvm or nvm-windows (https://cli.vuejs.org/guide/installation.html)

### Requirements

```
npm i -g yarn
```

```
yarn global add @vue/cli
```

### Project setup
```
yarn install
```

#### Compiles and hot-reloads for development
```
yarn serve
```

#### Compiles and minifies for production
```
yarn build
```

#### Run your unit tests
```
yarn test:unit
```

#### Lints and fixes files
```
yarn lint
```
