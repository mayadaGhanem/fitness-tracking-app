import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { Colors } from "@/constants/Colors";
import ActionContainer from "./StopWatchActions";
import InfoCard from "./InfoCard";
import { useSteps } from "@/hooks/useSteps";
import { store } from "@/redux/store";
import { setStepCount, setDuration } from "@/redux/StopWatch/stopWatchSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getHoursAndMinutesFromDuration } from "@/helpers/formatDuration";
import { useStopwatchComponent } from "@/hooks/useStopwatchComponent";

let intervalId: any;
// Define the background task
TaskManager.defineTask("BACKGROUND_STOPWATCH", async () => {
  try {
    // Logic to keep track of time or perform actions like updating async storage
    const state = store.getState().stopwatch;
    const { steps, isRunning } = state;
    if (isRunning) {
      intervalId = setInterval(() => {
        store.dispatch(setDuration());
      }, 1000);
      store.dispatch(setStepCount(steps + 1));
    }
    // store.dispatch(setCalories(calculateCalories(75, steps + 1)));
    // Return NewData to indicate the task succeeded
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error("Background task failed:", error);
    // Return Failed to indicate the task failed
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

const Stopwatch = () => {
  const { isPedometerAvailable, stopWatching } = useSteps();
  const { selectedActivity } = useSelector(
    (state: RootState) => state.stopwatch
  );
  // add all logic inside this hook spilt logic
  const { isLoading, checkActivity, loadActivities } =
    useStopwatchComponent(intervalId);
  const stopwatch = useSelector((state: RootState) => state.stopwatch);
  const { duration, calories, steps } = stopwatch;
  const { hours, minutes, seconds } = getHoursAndMinutesFromDuration(duration);
  if (!isPedometerAvailable && duration > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>The Pedometer is not available</Text>
      </View>
    );
  }

  useEffect(() => {
    loadActivities();
    checkActivity();
  }, [selectedActivity, isLoading]);

  useEffect(() => {
    loadActivities();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {hours} : {minutes} : {seconds}
      </Text>
      <Text style={styles.placeholder}>Time Elapsed</Text>
      <ActionContainer stopWatching={stopWatching} />
      <View style={styles.detailsContainer}>
        <InfoCard data={steps} differentiationText="Steps" />
        <InfoCard data={calories} differentiationText="Calories" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 8,
    padding: 32,
  },
  text: {
    color: Colors.dark.text.primary,
    fontWeight: "bold",
    fontSize: 32,
  },
  placeholder: {
    color: Colors.dark.text.subTitle,
    fontSize: 18,
  },
  detailsContainer: {
    paddingTop: 16,
    flexDirection: "row",
    gap: 16,
  },
});

export default Stopwatch;
