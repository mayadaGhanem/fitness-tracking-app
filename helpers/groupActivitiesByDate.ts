import { Activity } from "@/components/interface/Activity.interface";

export function groupActivitiesByDate(activities: Activity[]) {
  const groupedActivities: { [date: string]: Activity[] } = {};

  if (!activities || activities.length === 0) {
    return groupedActivities; // Return empty object if no activities
  }

  activities.forEach((activity) => {
    const date = new Date(activity.date).toISOString().split("T")[0]; // Extract YYYY-MM-DD

    if (!groupedActivities[date]) {
      groupedActivities[date] = [];
    }

    groupedActivities[date].push(activity);
  });

  return groupedActivities;
}
