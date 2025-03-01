export function convertStepsToKm(steps: number) {
  const stepLengthInMeters = 0.762;

  let distanceInKm = (steps * stepLengthInMeters) / 1000;

  return +distanceInKm.toFixed(2);
}
