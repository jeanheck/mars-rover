// Cardinal compass points
export const NORTH = 'N';
export const SOUTH = 'S';
export const EAST = 'E';
export const WEST = 'W';
// Possible rover rotation
export const RIGHT = 'R';
export const LEFT = 'L';
// Possible rover movement
export const MOVE = 'M';

export function formatOrientationLabel(orientation: string): string {
  switch (orientation) {
    case NORTH:
      return '🡅';
    case SOUTH:
      return '🡇';
    case EAST:
      return '🡆';
    case WEST:
      return '🡄';
    default:
      return '';
  }
}
