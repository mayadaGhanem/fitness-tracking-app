export type ActivityType = "run" | "walk" | "cycling" | "gym";
export interface Activity {
  id: string;
  type: ActivityType;
  duration: number;
  distance: number;
  date: string;
  calories: number;
  steps: number;
}
