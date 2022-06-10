import {
  NORTH, SOUTH, EAST, WEST, LEFT, RIGHT, MOVE,
} from './directions';

export default class Rover {
  private xAxys: number;

  private yAxys: number;

  cardinal: string;

  constructor(xAxys: number, yAxys: number, cardinal: string) {
    this.xAxys = xAxys;
    this.yAxys = yAxys;
    this.cardinal = cardinal;
  }

  getXAxys() {
    return this.xAxys;
  }

  setXAxys(value: number) {
    this.xAxys = value;
    if (this.xAxys < 0) {
      this.xAxys = 0;
    }
  }

  getYAxys() {
    return this.yAxys;
  }

  setYAxys(value: number) {
    this.yAxys = value;
    if (this.yAxys < 0) {
      this.yAxys = 0;
    }
  }

  private rotateToLeft() {
    switch (this.cardinal) {
      case NORTH:
        this.cardinal = WEST;
        break;
      case WEST:
        this.cardinal = SOUTH;
        break;
      case SOUTH:
        this.cardinal = EAST;
        break;
      case EAST:
        this.cardinal = NORTH;
        break;
      default:
        break;
    }
  }

  private rotateToRight() {
    switch (this.cardinal) {
      case NORTH:
        this.cardinal = EAST;
        break;
      case EAST:
        this.cardinal = SOUTH;
        break;
      case SOUTH:
        this.cardinal = WEST;
        break;
      case WEST:
        this.cardinal = NORTH;
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

  move() {
    switch (this.cardinal) {
      case NORTH:
        this.yAxys += 1;
        break;
      case SOUTH:
        this.yAxys -= 1;
        break;
      case WEST:
        this.xAxys -= 1;
        break;
      case EAST:
        this.xAxys += 1;
        break;
      default:
        break;
    }
  }

  explore(actions: string[]) {
    actions.forEach((action) => {
      switch (action) {
        case MOVE:
          this.move();
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
    });
  }
}
