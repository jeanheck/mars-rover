import Rover from './rover';

export default class Order {
  color: string;

  rover: Rover;

  instructions: string[];

  constructor(color: string, rover: Rover, instructions: string[]) {
    this.rover = rover;
    this.instructions = instructions;
    this.color = color;
  }
}
