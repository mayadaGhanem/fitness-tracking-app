import { useCallback, useEffect, useState } from "react";
import useSaveActivity from "@/hooks/useSaveActivity";
import { areSameDay } from "@/helpers/areSameDay";
import { getDays } from "@/helpers/getDays";
import { Activity } from "@/components/interface/Activity.interface";
import { useFocusEffect } from "@react-navigation/native";

export function useRecentActivitiesComponent() {
  const { activities, isLoading, loadActivities } = useSaveActivity();
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const { today, yesterday } = getDays();
  const loadFilteredActivities = () => {
    const filteredActivity = activities
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      .filter(
        (_item) =>
          areSameDay(new Date(_item.date), today) ||
          areSameDay(new Date(_item.date), yesterday)
      );

    setFilteredActivities(filteredActivity);
  };
  useEffect(() => {
    if (!isLoading) {
      loadFilteredActivities();
    }
  }, [isLoading]);

  useFocusEffect(
    useCallback(() => {
      loadActivities();

      return () => {
        // Optional: Clean up function
      };
    }, []) // Add dependencies if needed
  );

  return {
    filteredActivities,
    isLoading,
    loadActivities: loadFilteredActivities,
  };
}
