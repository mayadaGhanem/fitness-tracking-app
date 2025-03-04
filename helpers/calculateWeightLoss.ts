export function calculateWeightLossByDurationInSeconds(
  caloricDeficitPerSecond: number,
  durationInSeconds: number
): number {
  const caloriesPerPound = 3500; // 3,500 calories = 1 pound
  const poundsToKilograms = 0.453592; // 1 pound = 0.453592 kg

  // Calculate total caloric deficit for the given duration in seconds
  let totalDeficit = caloricDeficitPerSecond * durationInSeconds;

  let weightLossInPounds = totalDeficit / caloriesPerPound;

  let weightLossInKilograms = weightLossInPounds * poundsToKilograms;

  return +weightLossInKilograms.toFixed(2);
}
