import { useCallback, useState } from "react";
import { areSameDay } from "@/helpers/areSameDay";
import { getDays } from "@/helpers/getDays";
import { Activity } from "@/components/interface/Activity.interface";
import { useFocusEffect } from "@react-navigation/native";
import { loadActivities } from "@/helpers/handleActivityStorage";

export function useRecentActivitiesComponent() {
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const { today, yesterday } = getDays();
  const loadFilteredActivities = async () => {
    const activities: Activity[] = await loadActivities();
    const filteredActivity = activities
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      .filter(
        (_item) =>
          areSameDay(new Date(_item.date), today) ||
          areSameDay(new Date(_item.date), yesterday)
      );

    setFilteredActivities(filteredActivity);
  };

  useFocusEffect(
    useCallback(() => {
      loadFilteredActivities();

      return () => {
        // Optional: Clean up function
      };
    }, []) // Add dependencies if needed
  );

  return {
    filteredActivities,
    loadActivities: loadFilteredActivities,
  };
}
