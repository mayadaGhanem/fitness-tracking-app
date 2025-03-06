import { Activity } from "@/components/interface/Activity.interface";

export function getTotalSteps(data: Activity[]) {
  return data.reduce((prev, current) => {
    prev += current.steps;
    return prev;
  }, 0);
}

export function getTotalDuration(data: Activity[]) {
  return data.reduce((prev, current) => {
    prev += current.duration;
    return prev;
  }, 0);
}

export function getTotalDistance(data: Activity[]) {
  const distance= data.reduce((prev, current) => {
    prev += current.distance;
    return prev;
  }, 0);
  return +distance.toFixed(2);

}
export function getTotalCalories(data: Activity[]) {
  const calories = data.reduce((prev, current) => {
    prev += current.calories;
    return prev;
  }, 0);
  return Math.round(calories * 2) / 2;
}
