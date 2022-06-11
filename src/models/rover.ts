import {
  NORTH, SOUTH, EAST, WEST, LEFT, RIGHT, MOVE,
} from '@/utils/directions';
import getPositionInfo from '@/utils/plateau';
import Axis from './axis';

export default class Rover {
  private position: Axis;

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

  getPosition() {
    return this.position;
  }

  setPosition(position: Axis) {
    this.position = position;
  }

  getOtherRoversPositions() {
    return this.otherRoversOnPlateau.map((rover) => rover.getPosition());
  }

  setPositionX(plateauSize: Axis, difference: number) {
    const {
      newValue,
      lessThanZero,
      biggerThanPlateau,
    } = getPositionInfo(this.position.x, difference, plateauSize.x);

    if (
      !lessThanZero
      && !biggerThanPlateau
    ) {
      this.position.x = newValue;
    }
  }

  setPositionY(plateauSize: Axis, difference: number) {
    const {
      newValue,
      lessThanZero,
      biggerThanPlateau,
    } = getPositionInfo(this.position.y, difference, plateauSize.y);

    if (
      !lessThanZero
      && !biggerThanPlateau
    ) {
      this.position.y = newValue;
    }
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
