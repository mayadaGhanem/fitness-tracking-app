import { Activity } from "../interface/Activity.interface";

export const activities: Activity[] = [
  {
    id: 1,
    calories: 10,
    type: "walking",
    distance: "3.7",
    duration: 140000,
    date: new Date("2022-01-01"),
    steps: 1000,
  },
  {
    id: 2,
    type: "cycling",
    distance: "3.7",
    duration: 140000,
    date: new Date("2022-01-01"),
  },
  {
    id: 3,
    type: "running",
    distance: "3.7",
    duration: 140000,
    date: new Date("2022-01-01"),
  },
];
