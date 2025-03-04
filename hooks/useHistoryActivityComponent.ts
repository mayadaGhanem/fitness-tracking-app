import { useCallback, useEffect, useState } from "react";
import { areSameDay } from "@/helpers/areSameDay";
import { getDays } from "@/helpers/getDays";
import { groupActivitiesByDate } from "@/helpers/groupActivitiesByDate";
import { Activity } from "@/components/interface/Activity.interface";
import { getDayMonthYear } from "@/helpers/formatDate";
import { useFocusEffect } from "@react-navigation/native";
import { loadActivities } from "@/helpers/handleActivityStorage";

type flatListItemHeader = { type: string; title: string; id: string };
type flatListItem = flatListItemHeader | Activity;

export function useHistoryActivityComponent() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activities, setActivities] = useState<{
    original: Activity[];
    filtered: Activity[];
  }>({ original: [], filtered: [] });
  const { today, yesterday } = getDays();
  const getActivities = async () => {
    const allActivities: Activity[] = (await loadActivities()) ?? [];

    setActivities({
      original: allActivities,
      filtered: allActivities?.sort(
        (a, b) => Date.parse(b.date) - Date.parse(a.date)
      ),
    });
  };
  useFocusEffect(
    useCallback(() => {
      getActivities()
    }, []) 
  );



  const groupedData = groupActivitiesByDate(activities.filtered);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);

    const filteredActivity = activities.original
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      .filter((_item) => getDayMonthYear(_item.date) === getDayMonthYear(date));
    setActivities({
      ...activities,
      filtered: areSameDay(new Date(date), today)
        ? activities.original
        : filteredActivity,
    });
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

  return { dataForFlatList, handleDateChange, selectedDate };
}
