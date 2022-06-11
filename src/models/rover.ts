import {
  NORTH, SOUTH, EAST, WEST, LEFT, RIGHT, MOVE,
} from '@/utils/directions';
import Axis from './axis';

export default class Rover {
  private position: Axis;

  orientation: string;

  constructor(position: Axis, orientation: string) {
    this.position = position;
    this.orientation = orientation;
  }

  getPosition() {
    return this.position;
  }

  setPosition(position: Axis) {
    this.position = position;
  }

  private setPositionX(plateauSize: Axis, difference: number) {
    const newX = this.position.x + difference;
    const lessThanZero = newX < 0;
    const biggerThanPlateau = newX > plateauSize.x;

    if (!lessThanZero && !biggerThanPlateau) {
      this.position.x = newX;
    }
  }

  private setPositionY(plateauSize: Axis, difference: number) {
    const newY = this.position.y + difference;
    const lessThanZero = newY < 0;
    const biggerThanPlateau = newY > plateauSize.y;

    if (!lessThanZero && !biggerThanPlateau) {
      this.position.y = newY;
    }
  }

  private rotateToLeft() {
    switch (this.orientation) {
      case NORTH:
        this.orientation = WEST;
        break;
      case WEST:
        this.orientation = SOUTH;
        break;
      case SOUTH:
        this.orientation = EAST;
        break;
      case EAST:
        this.orientation = NORTH;
        break;
      default:
        break;
    }
  }

  private rotateToRight() {
    switch (this.orientation) {
      case NORTH:
        this.orientation = EAST;
        break;
      case EAST:
        this.orientation = SOUTH;
        break;
      case SOUTH:
        this.orientation = WEST;
        break;
      case WEST:
        this.orientation = NORTH;
        break;
      default:
        break;
    }
  }

  rotateTo(direction: string) {
    switch (direction) {
      case LEFT:
        this.rotateToLeft();
        break;
      case RIGHT:
        this.rotateToRight();
        break;
      default:
        break;
    }
  }

  move(plateauSize: Axis) {
    switch (this.orientation) {
      case NORTH:
        this.setPositionY(plateauSize, 1);
        break;
      case SOUTH:
        this.setPositionY(plateauSize, -1);
        break;
      case WEST:
        this.setPositionX(plateauSize, -1);
        break;
      case EAST:
        this.setPositionX(plateauSize, 1);
        break;
      default:
        break;
    }
  }

  async explore(actions: string[], plateauSize: Axis) {
    return new Promise((resolve) => {
      actions.forEach((action, i) => {
        setTimeout(() => {
          switch (action) {
            case MOVE:
              this.move(plateauSize);
              break;
            case LEFT:
              this.rotateToLeft();
              break;
            case RIGHT:
              this.rotateToRight();
              break;
            default:
              break;
          }

          // console.log(`Position -> ${this.getPosition()}; Orientation -> ${this.orientation}`);

          if (i === actions.length - 1) {
            setTimeout(() => {
              resolve(true);
            }, 1000);
          }
        }, i * 1000);
      });
    });
  }
}
