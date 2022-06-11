import {
  EAST, LEFT, MOVE, NORTH, RIGHT, SOUTH,
} from '@/utils/directions';
import { Plateau, Rover } from '@/models';

jest.setTimeout(60000);

describe('Plateau', () => {
  it('send rovers to explore with some instructions, in a 9 x 9 plateau', async () => {
    const roverOne = new Rover({ x: 1, y: 2 }, NORTH, [LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, MOVE], 'blue');
    const roverTwo = new Rover({ x: 3, y: 3 }, EAST, [MOVE, RIGHT, RIGHT, MOVE, MOVE, RIGHT, MOVE, RIGHT, RIGHT, MOVE], 'green');

    const plateau = new Plateau({ x: 9, y: 9 }, [roverOne, roverTwo]);

    await plateau.sendRoversToExplore();

    expect(roverOne.getPosition()).toStrictEqual({ x: 1, y: 3 });
    expect(roverOne.orientation).toBe(NORTH);

    expect(roverTwo.getPosition()).toStrictEqual({ x: 2, y: 3 });
    expect(roverTwo.orientation).toBe(SOUTH);
  });

  it('send rovers to explore with some instructions, in a 2 x 2 plateau', () => {
    const roverOne = new Rover({ x: 1, y: 2 }, NORTH, [LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, MOVE], 'blue');
    const plateau = new Plateau({ x: 2, y: 2 }, [roverOne]);

    plateau.sendRoversToExplore();

    expect(roverOne.getPosition()).toStrictEqual({ x: 1, y: 2 });
    expect(roverOne.orientation).toBe(NORTH);
  });
});
