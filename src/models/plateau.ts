/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
  EAST, LEFT, MOVE, NORTH, RIGHT, SOUTH, WEST,
} from '@/utils/directions';
import Axis from './axis';
import Rover from './rover';

export default class Plateau {
  size: Axis;

  rovers: Rover[];

  constructor(size: Axis, rovers: Rover[] = []) {
    this.size = size;
    this.rovers = rovers;
  }

  sendRoversToExplore() {
    return new Promise((resolve) => {
      setTimeout(async () => {
        for (const [index, rover] of this.rovers.entries()) {
          await this.explore(rover);

          if (index === this.rovers.length - 1) {
            setTimeout(() => {
              resolve(true);
            }, 1000);
          }
        }
      }, 3000);
    });
  }

  getAllRoverPositions() {
    return this.rovers.map((rover) => rover.getPosition());
  }

  positionIsBusy(position: Axis) {
    return this.getAllRoverPositions()
      .find((roverPosition) => roverPosition.x === position.x && roverPosition.y === position.y)
      !== undefined;
  }

  move(rover: Rover) {
    switch (rover.orientation) {
      case NORTH:
        // agora eu sei a posição do rover
        // e tenho os dados dos outros rovers

        // só preciso verificar a posição deles antes, e se a posição para qual eu vou,
        // não estiver bloqueada antes, eu dou um set

        // o set do rover deve apenas mover, as verificações devem ficar todas aqui

        if (this.positionIsBusy({ x: rover.getPosition().x, y: rover.getPosition().y + 1 })) {
          console.log('Posição ocupada!');
        } else {
          rover.setPositionY(this.size, 1);
        }
        break;
      case SOUTH:
        if (this.positionIsBusy({ x: rover.getPosition().x, y: rover.getPosition().y - 1 })) {
          console.log('Posição ocupada!');
        } else {
          rover.setPositionY(this.size, -1);
        }
        break;
      case WEST:
        if (this.positionIsBusy({ x: rover.getPosition().x - 1, y: rover.getPosition().y })) {
          console.log('Posição ocupada!');
        } else {
          rover.setPositionX(this.size, -1);
        }
        break;
      case EAST:
        if (this.positionIsBusy({ x: rover.getPosition().x + 1, y: rover.getPosition().y })) {
          console.log('Posição ocupada!');
        } else {
          rover.setPositionX(this.size, 1);
        }
        break;
      default:
        break;
    }
  }

  async explore(rover: Rover) {
    return new Promise((resolve) => {
      rover.instructions.forEach((action, i) => {
        setTimeout(() => {
          switch (action) {
            case MOVE:
              this.move(rover);
              break;
            case LEFT:
              rover.rotateToLeft();
              break;
            case RIGHT:
              rover.rotateToRight();
              break;
            default:
              break;
          }

          // console.log(`Position -> ${this.getPosition()}; Orientation -> ${this.orientation}`);

          if (i === rover.instructions.length - 1) {
            setTimeout(() => {
              resolve(true);
            }, 1000);
          }
        }, i * 1000);
      });
    });
  }
}
