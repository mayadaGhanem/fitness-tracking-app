import { useCallback, useEffect, useState } from "react";
import useSaveActivity from "@/hooks/useSaveActivity";
import { areSameDay } from "@/helpers/areSameDay";
import { getDays } from "@/helpers/getDays";
import { groupActivitiesByDate } from "@/helpers/groupActivitiesByDate";
import { Activity } from "@/components/interface/Activity.interface";
import { getDayMonthYear } from "@/helpers/formatDate";
import { useFocusEffect } from "@react-navigation/native";

type flatListItemHeader = { type: string; title: string; id: string };
type flatListItem = flatListItemHeader | Activity;

export function useHistoryActivityComponent() {
  const { activities, isLoading, loadActivities } = useSaveActivity();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const { today, yesterday } = getDays();
  useEffect(() => {
    !isLoading &&
      setFilteredActivities(
        activities.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      );
  }, [isLoading]);

  useFocusEffect(
    useCallback(() => {
      loadActivities();

      return () => {
        // Optional: Clean up function
      };
    }, []) // Add dependencies if needed
  );

  const groupedData = groupActivitiesByDate(filteredActivities);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);

    const filteredActivity = activities
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      .filter((_item) => getDayMonthYear(_item.date) === getDayMonthYear(date));
    areSameDay(new Date(date), today)
      ? setFilteredActivities(activities)
      : setFilteredActivities(filteredActivity);
  };

  const getTitle = (_key: string): string => {
    if (areSameDay(new Date(_key), today)) {
      return "Today";
    } else if (areSameDay(new Date(_key), yesterday)) {
      return "Yesterday";
    } else {
      return _key;
    }
  };

  const dataForFlatList = Object.keys(groupedData).reduce(
    (acc, _key, index) => {
      const isHeaderExists = acc.find(
        (_item) => _item.type === "header" && _item.title === getTitle(_key)
      );
      if (!isHeaderExists) {
        acc.push({
          type: "header",
          title: getTitle(_key),
          id: index.toString(),
        });
      }
      acc = [...acc, ...groupedData[_key].map((item) => ({ ...item }))];

      return acc;
    },
    [] as flatListItem[]
  );

  return { dataForFlatList, isLoading, handleDateChange, selectedDate };
}
