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

## About the project and the problem

In that [link](https://gitlab.com/voyager-portal/voyager-rover-test) you can see the problem proposed.<br />
The logical part, you can find in models folder (```src/models/```).<br />
The code responsible to the simulation that you find when you open http://localhost:8080, is on ```src/components/PlateauView.vue```.<br />
To add more rovers with different patterns of movement, just add a new Rover object declaration on the ```rovers``` array, on line 40 of ```PlateauView.vue``` file.<br />
The pre-existent Blue rover and Green rover, simulates the two rovers on the exercise description.<br />

### Two more improvements

The rovers have a kind of "Colision" and "Dont trespass plateau limits" system. You can check that opening the [simulation](http://localhost:8080) and pressing opening the browser console. A message will appear if the rover cannot move.
