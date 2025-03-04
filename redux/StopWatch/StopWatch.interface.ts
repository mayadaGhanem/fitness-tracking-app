import { ActivityType } from "@/components/interface/Activity.interface";

export interface StopwatchState {
  duration: number;
  steps: number;
  calories: number;
  distance: number;
  weight: number;
  isRunning: boolean;
  type: ActivityType;
}
