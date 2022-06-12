import {
  NORTH, SOUTH, EAST, WEST, LEFT, RIGHT,
} from '@/utils/directions';
import Axis from './axis';

export default class Rover {
  position: Axis;

  orientation: string;

  instructions: string[];

  color: string;

  otherRoversOnPlateau: Rover[] = [];

  constructor(position: Axis, orientation: string, instructions: string[], color: string) {
    this.position = position;
    this.orientation = orientation;
    this.instructions = instructions;
    this.color = color;
  }

  setPosition(position: Axis) {
    this.position = position;
  }

  getOtherRoversPositions() {
    return this.otherRoversOnPlateau.map((rover) => rover.position);
  }

  rotateToLeft() {
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

  rotateToRight() {
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
}
