import Rover from '@/models/rover';
import {
  EAST, LEFT, MOVE, NORTH, RIGHT, SOUTH, WEST,
} from '@/models/directions';

describe('Rover', () => {
  let rover: Rover;

  beforeAll(() => {
    rover = new Rover(0, 0, NORTH);
  });

  it('rotate a rover to left, when the original position is NORTH', () => {
    rover.cardinal = NORTH;
    rover.rotateTo(LEFT);

    expect(rover.cardinal).toBe(WEST);
  });
  it('rotate a rover to right, when the original position is NORTH', () => {
    rover.cardinal = NORTH;
    rover.rotateTo(RIGHT);

    expect(rover.cardinal).toBe(EAST);
  });
  it('rotate a rover to left, when the original position is SOUTH', () => {
    rover.cardinal = SOUTH;
    rover.rotateTo(LEFT);

    expect(rover.cardinal).toBe(EAST);
  });
  it('rotate a rover to right, when the original position is SOUTH', () => {
    rover.cardinal = SOUTH;
    rover.rotateTo(RIGHT);

    expect(rover.cardinal).toBe(WEST);
  });

  it('move the rover in different ways', () => {
    rover.cardinal = NORTH;
    rover.move();
    rover.move();
    rover.move();

    expect(rover.getYAxys()).toBe(3);
    expect(rover.getXAxys()).toBe(0);

    rover.cardinal = EAST;
    rover.move();
    rover.move();
    rover.move();

    expect(rover.getYAxys()).toBe(3);
    expect(rover.getXAxys()).toBe(3);

    rover.cardinal = SOUTH;
    rover.move();
    rover.move();
    rover.move();

    expect(rover.getYAxys()).toBe(0);
    expect(rover.getXAxys()).toBe(3);

    rover.cardinal = WEST;
    rover.move();
    rover.move();
    rover.move();

    expect(rover.getYAxys()).toBe(0);
    expect(rover.getXAxys()).toBe(0);
  });

  it('move the rover with a sequence of exploration actions', () => {
    rover.cardinal = NORTH;
    rover.setXAxys(1);
    rover.setYAxys(2);

    rover.explore([LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, LEFT, MOVE, MOVE]);

    expect(rover.getXAxys()).toBe(1);
    expect(rover.getYAxys()).toBe(3);
    expect(rover.cardinal).toBe(NORTH);

    rover.cardinal = EAST;
    rover.setXAxys(3);
    rover.setYAxys(3);

    rover.explore([MOVE, RIGHT, RIGHT, MOVE, MOVE, RIGHT, MOVE, RIGHT, RIGHT, MOVE]);

    expect(rover.getXAxys()).toBe(2);
    expect(rover.getYAxys()).toBe(3);
    expect(rover.cardinal).toBe(SOUTH);
  });
});
