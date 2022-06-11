export default function getPositionInfo(axis: number, difference: number, plateauAxis: number) {
  const newValue = axis + difference;
  const lessThanZero = newValue < 0;
  const biggerThanPlateau = newValue > plateauAxis;

  return {
    newValue, lessThanZero, biggerThanPlateau,
  };
}
