import Rover from './rover';

export default class Order {
  rover: Rover;

  instructions: string[];

  constructor(rover: Rover, instructions: string[]) {
    this.rover = rover;
    this.instructions = instructions;
  }
}
