import {
  EAST, LEFT, MOVE, NORTH, RIGHT, SOUTH,
} from '@/utils/directions';
import { Order, Plateau, Rover } from '@/models';
import sendRoversToExplore from '@/services/exploration';

jest.setTimeout(60000);

describe('Exploration', () => {
  it('send rovers to explore with some instructions, in a 9 x 9 plateau', async () => {
    const roverOne = new Rover({ x: 1, y: 2 }, NORTH);
    const roverOneInstructions = [LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, MOVE];

    const roverTwo = new Rover({ x: 3, y: 3 }, EAST);
    const roverTwoInstructions = [MOVE, RIGHT, RIGHT, MOVE, MOVE, RIGHT, MOVE, RIGHT, RIGHT, MOVE];

    const plateau = new Plateau({ x: 9, y: 9 });

    const orders = [
      new Order(
        'blue',
        roverOne,
        roverOneInstructions,
      ),
      new Order(
        'green',
        roverTwo,
        roverTwoInstructions,
      ),
    ];

    await sendRoversToExplore(orders, plateau.size);

    expect(roverOne.getPosition()).toStrictEqual({ x: 1, y: 3 });
    expect(roverOne.orientation).toBe(NORTH);

    expect(roverTwo.getPosition()).toStrictEqual({ x: 2, y: 3 });
    expect(roverTwo.orientation).toBe(SOUTH);
  });

  it('send rovers to explore with some instructions, in a 2 x 2 plateau', () => {
    const roverOne = new Rover({ x: 1, y: 2 }, NORTH);
    const roverOneInstructions = [LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, MOVE];

    const plateau = new Plateau({ x: 2, y: 2 });

    const orders = [
      new Order(
        'yellow',
        roverOne,
        roverOneInstructions,
      ),
    ];

    sendRoversToExplore(orders, plateau.size);

    expect(roverOne.getPosition()).toStrictEqual({ x: 1, y: 2 });
    expect(roverOne.orientation).toBe(NORTH);
  });
});
