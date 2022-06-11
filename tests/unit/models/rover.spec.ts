import { Plateau, Rover } from '@/models';
import {
  EAST, LEFT, MOVE, NORTH, RIGHT, SOUTH, WEST,
} from '@/utils/directions';

jest.setTimeout(60000);

describe('Rover', () => {
  const rover = new Rover({ x: 0, y: 0 }, NORTH);
  const plateau = new Plateau({ x: 9, y: 9 });

  it('rotate a rover to left, when the original position is NORTH', () => {
    rover.orientation = NORTH;
    rover.rotateTo(LEFT);

    expect(rover.orientation).toBe(WEST);
  });
  it('rotate a rover to right, when the original position is NORTH', () => {
    rover.orientation = NORTH;
    rover.rotateTo(RIGHT);

    expect(rover.orientation).toBe(EAST);
  });
  it('rotate a rover to left, when the original position is SOUTH', () => {
    rover.orientation = SOUTH;
    rover.rotateTo(LEFT);

    expect(rover.orientation).toBe(EAST);
  });
  it('rotate a rover to right, when the original position is SOUTH', () => {
    rover.orientation = SOUTH;
    rover.rotateTo(RIGHT);

    expect(rover.orientation).toBe(WEST);
  });

  it('move the rover in different ways', () => {
    rover.orientation = NORTH;
    rover.move(plateau.size);
    expect(rover.getPosition().y).toBe(1);

    rover.orientation = EAST;
    rover.move(plateau.size);

    expect(rover.getPosition().x).toBe(1);

    rover.orientation = SOUTH;
    rover.move(plateau.size);

    expect(rover.getPosition().y).toBe(0);

    rover.orientation = WEST;
    rover.move(plateau.size);

    expect(rover.getPosition().x).toBe(0);
  });

  it('move the rover with a sequence of exploration actions', async () => {
    rover.orientation = NORTH;
    rover.setPosition({ x: 1, y: 2 });

    await rover.explore([LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, MOVE], plateau.size);

    expect(rover.getPosition()).toStrictEqual({ x: 1, y: 3 });
    expect(rover.orientation).toBe(NORTH);
  });
});
