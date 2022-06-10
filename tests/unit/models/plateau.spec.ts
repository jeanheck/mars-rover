import {
  EAST, LEFT, MOVE, NORTH, RIGHT, SOUTH,
} from '@/models/directions';
import Order from '@/models/order';
import Plateau from '@/models/plateau';
import Rover from '@/models/rover';

describe('Plateau', () => {
  it('send rovers to explore with some instructions', () => {
    const roverOne = new Rover(1, 2, NORTH);
    const roverOneInstructions = [LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, MOVE];

    const roverTwo = new Rover(3, 3, EAST);
    const roverTwoInstructions = [MOVE, RIGHT, RIGHT, MOVE, MOVE, RIGHT, MOVE, RIGHT, RIGHT, MOVE];

    const plateau = new Plateau([
      new Order(
        roverOne,
        roverOneInstructions,
      ),
      new Order(
        roverTwo,
        roverTwoInstructions,
      ),
    ]);

    plateau.sendRoversToExplore();

    expect(roverOne.getXAxys()).toBe(1);
    expect(roverOne.getYAxys()).toBe(3);
    expect(roverOne.cardinal).toBe(NORTH);

    expect(roverTwo.getXAxys()).toBe(2);
    expect(roverTwo.getYAxys()).toBe(3);
    expect(roverTwo.cardinal).toBe(SOUTH);
  });
});
