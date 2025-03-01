import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Activity,
  ActivityType,
} from "@/components/interface/Activity.interface";
import * as Crypto from "expo-crypto";
import { areSameDay } from "@/helpers/areSameDay";
import { useFocusEffect } from "@react-navigation/native";
const useSaveActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadActivities();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);

      return () => {
        // Optional: Clean up function
      };
    }, []) // Add dependencies if needed
  );
  const loadActivities = async () => {
    try {
      const storedData = await AsyncStorage.getItem("activities");

      if (!!storedData) {
        const parsed = JSON.parse(storedData);
        setActivities(parsed);
      }
    } catch (error) {
      console.error("Failed to load activities", error);
    } finally {
      setIsLoading(false);
    }
  };
  const getSavedActivityIndex = async (
    activityType: ActivityType,
    date?: string
  ) => {
    const activityIndex: number = activities.findIndex(
      (_activity: Activity) => {
        const checkSameDay = areSameDay(
          date ? new Date(date) : new Date(),
          new Date(_activity.date)
        );
        return _activity.type === activityType && checkSameDay;
      }
    );
    return activityIndex;
  };

  const saveActivityToStorage = async (
    activity: Omit<Activity, "id" | "date">
  ) => {
    try {
      setIsLoading(true);

      const newActivity = {
        ...activity,
        date: new Date().toISOString(),
      } as Activity;

      const storedData = await AsyncStorage.getItem("activities");
      const activityList = storedData ? JSON.parse(storedData) : [];
      const checkActivityIndex = await getSavedActivityIndex(activity.type);

      if (checkActivityIndex !== -1) {
        activityList[checkActivityIndex] = {
          ...activityList[checkActivityIndex],
          ...newActivity,
        };
      } else {
        const uuid = Crypto.randomUUID();
        newActivity.id = uuid;
      }

      const updatedActivities =
        checkActivityIndex === -1
          ? [...activityList, newActivity]
          : activityList;
      await AsyncStorage.setItem(
        "activities",
        JSON.stringify(updatedActivities)
      );

      setActivities(updatedActivities);
    } catch (error) {
      Alert.alert("Error", "Failed to save activity.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearActivityFromStorage = async (activityType: ActivityType) => {
    try {
      setIsLoading(true);

      const storedData = await AsyncStorage.getItem("activities");
      const activityList = storedData ? JSON.parse(storedData) : [];

      const newActivityList = JSON.parse(JSON.stringify(activityList));

      const filteredList = newActivityList.filter((_activity: Activity) => {
        const checkSameDay = areSameDay(new Date(), new Date(_activity.date));
        return !(_activity.type == activityType && checkSameDay);
      });
      await AsyncStorage.setItem("activities", JSON.stringify(filteredList));
      setActivities(filteredList);
    } catch (error) {
      Alert.alert("Error", "Failed to clear history.");
    } finally {
      loadActivities();
    }
  };
  const clearActivities = async () => {
    try {
      await AsyncStorage.removeItem("activities");
      setActivities([]);
    } catch (error) {
      Alert.alert("Error", "Failed to clear history.");
    }
  };

  return {
    activities,
    isLoading,
    saveActivityToStorage,
    loadActivities,
    clearActivities,
    clearActivityFromStorage,
    getSavedActivityIndex,
  };
};

export default useSaveActivity;
