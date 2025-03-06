import React from "react";
import { Text, View, StyleSheet } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { Colors } from "@/constants/Colors";
import ActionContainer from "./StopWatchActions";
import InfoCard from "./InfoCard";
import { useSteps } from "@/hooks/useSteps";
import { store } from "@/redux/store";
import {
  setDuration,
  setData,
  initialState,
} from "@/redux/StopWatch/stopWatchSlice";
import { getHoursAndMinutesFromDuration } from "@/helpers/formatDuration";
import { calculateCalories } from "@/helpers/getCalories";
import { Pedometer } from "expo-sensors";
import { getSavedActivity } from "@/helpers/handleActivityStorage";

let intervalId: any;
let stepWatch: Pedometer.Subscription;
// Define the background task
TaskManager.defineTask("BACKGROUND_STOPWATCH", async () => {
  try {
    const state = store.getState().stopwatch;
    const { isRunning, weight, type } = state;
    if (isRunning) {
      const activity = (await getSavedActivity(type)) ?? initialState;
      intervalId = setInterval(() => {
        store.dispatch(setDuration());
      }, 1000);
      stepWatch = Pedometer.watchStepCount((result) => {
        const newSteps = result.steps + activity.steps;
        const calculatedCalories = calculateCalories(weight, newSteps);
        store.dispatch(
          setData({
            steps: newSteps,
            calories: calculatedCalories,
          })
        );
      });
    }
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error("Background task failed:", error);
    // Clear interval in case of error to avoid memory leaks
    clearInterval(intervalId);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  } finally {
    // Clear the interval regardless of success or failure to avoid memory leaks
    if (intervalId) {
      clearInterval(intervalId);
    }
    if (stepWatch) {
      stepWatch.remove();
    }
  }
});

const Stopwatch = () => {
  // add all logic inside this hook spilt logic
  const {
    isPedometerAvailable,
    stopWatching,
    stepsCountState,
    durationState,
    caloriesState,
    resetStopwatchHandler,
  } = useSteps();
  const { hours, minutes, seconds } =
    getHoursAndMinutesFromDuration(durationState);
  if (!isPedometerAvailable && durationState > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>The Pedometer is not available</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {hours} : {minutes} : {seconds}
      </Text>
      <Text style={styles.placeholder}>Time Elapsed</Text>
      <ActionContainer
        stopWatching={stopWatching}
        resetStopwatchHandler={resetStopwatchHandler}
      />
      <View style={styles.detailsContainer}>
        <InfoCard data={stepsCountState} differentiationText="Steps" />
        <InfoCard data={caloriesState} differentiationText="Calories" />
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
