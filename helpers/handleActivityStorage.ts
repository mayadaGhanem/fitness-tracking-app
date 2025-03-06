import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Activity,
  ActivityType,
} from "@/components/interface/Activity.interface";
import { areSameDay } from "@/helpers/areSameDay";

const saveActivityToStorage = async (
  activity: Omit<Activity, "id" | "date">
) => {
  // const {yesterday}=getDays()
  try {
    const newActivity = {
      ...activity,
      date: new Date().toISOString(),
    } as Activity;
    const storedData = await AsyncStorage.getItem("activities");
    let activityList = storedData ? JSON.parse(storedData) : [];

    newActivity.id = new Date().toISOString();
    activityList.push(newActivity);

    await AsyncStorage.setItem("activities", JSON.stringify(activityList));
  } catch (error) {
    Alert.alert("Error", "Failed to save activity.");
    console.error(error);
  }
};

const clearActivities = async () => {
  try {
    await AsyncStorage.removeItem("activities");
  } catch (error) {
    Alert.alert("Error", "Failed to clear history.");
  }
};

const loadActivities = async () => {
  try {
    // await AsyncStorage.removeItem("activities");
    const storedData = await AsyncStorage.getItem("activities");
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error("Failed to load activities", error);
  }
};

const getSavedActivity = async (
  activityType: ActivityType,
  date?: string
): Promise<Activity | undefined> => {
  const activities = await loadActivities();
  const activity = activities.find((_activity: Activity) => {
    const checkSameDay = areSameDay(
      date ? new Date(date) : new Date(),
      new Date(_activity.date)
    );
    return _activity.type === activityType && checkSameDay;
  });
  return activity;
};

export {
  loadActivities,
  getSavedActivity,
  clearActivities,
  saveActivityToStorage,
};
