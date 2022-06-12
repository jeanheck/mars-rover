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
    return this.rovers.map((rover) => rover.position);
  }

  positionIsBusy(position: Axis) {
    return this.getAllRoverPositions()
      .find((roverPosition) => roverPosition.x === position.x && roverPosition.y === position.y)
      !== undefined;
  }

  plateauWithoutSpace(position: Axis, difference: number, axle: string) {
    const axleValue = axle === 'x' ? position.x : position.y;
    const plateauAxleValue = axle === 'x' ? this.size.x : this.size.y;

    const newValue = axleValue + difference;
    const lessThanZero = newValue < 0;
    const biggerThanPlateau = newValue > plateauAxleValue;

    return lessThanZero || biggerThanPlateau;
  }

  isPossibleToMove(position: Axis, difference: number, axle: string) {
    const futurePosition = {
      x: axle === 'x' ? position.x + difference : position.x,
      y: axle === 'y' ? position.y + difference : position.y,
    };

    return !this.positionIsBusy(futurePosition)
      && !this.plateauWithoutSpace(position, difference, axle);
  }

  move(rover: Rover) {
    switch (rover.orientation) {
      case NORTH:
        if (this.isPossibleToMove(rover.position, 1, 'y')) {
          rover.setPosition({ x: rover.position.x, y: rover.position.y + 1 });
        } else {
          console.log('Position is busy, or Plateau is out of limits!');
        }
        break;
      case SOUTH:
        if (this.isPossibleToMove(rover.position, -1, 'y')) {
          rover.setPosition({ x: rover.position.x, y: rover.position.y - 1 });
        } else {
          console.log('Position is busy, or Plateau is out of limits!');
        }
        break;
      case WEST:
        if (this.isPossibleToMove(rover.position, -1, 'x')) {
          rover.setPosition({ x: rover.position.x - 1, y: rover.position.y });
        } else {
          console.log('Position is busy, or Plateau is out of limits!');
        }
        break;
      case EAST:
        if (this.isPossibleToMove(rover.position, 1, 'x')) {
          rover.setPosition({ x: rover.position.x + 1, y: rover.position.y });
        } else {
          console.log('Position is busy, or Plateau is out of limits!');
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
