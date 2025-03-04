export function calculateCalories(weight: number, steps: number) {
  // Average calories burned per step at a moderate walking pace (3 mph)
  const caloriesPerStep = 0.04;

  // Calculate total calories burned
  let totalCalories = steps * caloriesPerStep;

  // Adjust for user's weight (calories burned increase with weight)
  totalCalories = totalCalories * (weight / 160); // Assuming 160 lbs as a baseline

  return +totalCalories.toFixed(1);
}
