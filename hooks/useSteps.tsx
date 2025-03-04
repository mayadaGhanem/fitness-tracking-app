import {
  initialState,
  resetStopwatch,
  setData,
  setIsRunning,
} from "@/redux/StopWatch/stopWatchSlice";
import { RootState } from "@/redux/store";
import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { calculateCalories } from "@/helpers/getCalories";
import { convertStepsToKm } from "@/helpers/convertStepsToKm";
import { calculateWeightLossByDurationInSeconds } from "@/helpers/calculateWeightLoss";
import {
  clearActivityFromStorage,
  getSavedActivity,
  saveActivityToStorage,
} from "@/helpers/handleActivityStorage";
import * as BackgroundFetch from "expo-background-fetch";
import { getDays } from "@/helpers/getDays";
import { StopwatchState } from "@/redux/StopWatch/StopWatch.interface";

export function useSteps() {
  const dispatch = useDispatch();
  const stopwatchState = useSelector((state: RootState) => state.stopwatch);
  const { isRunning, weight, type } = stopwatchState;
  const [isPedometerAvailable, setIsPedometerAvailable] =
    useState<boolean>(true);
  const initial = {
    stepsCountState: 0,
    caloriesState: 0,
  };
  const [durationState, setDurationState] = useState(0);
  const [stepsData, setStepsData] = useState(initial);
  const { stepsCountState, caloriesState } = stepsData;
  let stepWatch: Pedometer.Subscription | null = null;
  let intervalId: NodeJS.Timeout | null;

  const updatePedoMeterSteps = async () => {
    if (isRunning && isPedometerAvailable) {
      const { steps } = await currentActivity();
      intervalId = setInterval(() => {
        setDurationState((prev) => ++prev);
      }, 1000);
      stepWatch = Pedometer.watchStepCount((result) => {
        const newSteps = result.steps + steps;
        const calculatedCalories = calculateCalories(weight, newSteps);
        setStepsData({
          stepsCountState: newSteps,
          caloriesState: calculatedCalories,
        });
      });
    }
  };

  const stopWatching = async () => {
    if (stepWatch) {
      stepWatch.remove();
    }
    dispatch(setIsRunning(false));

    const calculatedDistance = convertStepsToKm(stepsCountState);
    const totalDeficit = calculateWeightLossByDurationInSeconds(
      caloriesState,
      durationState
    );
    const newWeight = weight - totalDeficit;
    await saveActivityToStorage({
      steps: stepsCountState,
      duration: durationState,
      type,
      calories: caloriesState,
      distance: calculatedDistance,
    });
    dispatch(
      setData({
        steps: stepsCountState,
        isRunning: false,
        duration: durationState,
        calories: caloriesState,
        distance: calculatedDistance,
        weight: newWeight,
        type,
      })
    );
  };

  const handlePedometerPermission = async () => {
    const permissions = await Pedometer.getPermissionsAsync();
    if (!permissions.granted) {
      await Pedometer.requestPermissionsAsync();
      const updatedPermissions = await Pedometer.getPermissionsAsync();
      if (!updatedPermissions.granted) {
        Alert.alert(
          "You cannot calculate your steps until you share your steps taken"
        );
      }
    }
  };

  const checkPedometerAvailability = async () => {
    const available = await Pedometer.isAvailableAsync();

    if (!available) {
      setIsPedometerAvailable(!available);
      Alert.alert(
        "Pedometer Not Available",
        "Your device does not support step tracking."
      );
    } else {
      handlePedometerPermission();
    }
  };

  const { today } = getDays();
  const currentActivity = async () => {
    const activity =
      (await getSavedActivity(type, today.toISOString())) ?? initialState;
    let currentActivity: StopwatchState = {
      ...initialState,
      ...activity,
      type,
      isRunning: false,
    };
    return currentActivity;
  };

  const checkActivity = async () => {
    const activity = await currentActivity();
    setStepsData({
      stepsCountState: activity.steps,
      caloriesState: activity.calories,
    });
    setDurationState(activity.duration);
  };
  // Handle background fetch and register task
  useEffect(() => {
    const startBackgroundFetch = async () => {
      await BackgroundFetch.registerTaskAsync("BACKGROUND_STOPWATCH", {
        minimumInterval: 15, // In minutes
        stopOnTerminate: false,
        startOnBoot: true,
      });
    };

    startBackgroundFetch();
    checkPedometerAvailability();
    checkActivity();

    return () => {
      BackgroundFetch.unregisterTaskAsync("BACKGROUND_STOPWATCH");
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
  }, []);

  const resetStopwatchHandler = async () => {
    await clearActivityFromStorage(stopwatchState.type);
    dispatch(resetStopwatch());
    setStepsData(initial);
    setDurationState(0);
  };

  useEffect(() => {
    checkActivity();
  }, [type]);

  useEffect(() => {
    updatePedoMeterSteps();
    return () => {
      intervalId && clearInterval(intervalId);
      if (stepWatch) {
        stepWatch.remove();
      }
    };
  }, [isRunning, isPedometerAvailable]);
  return {
    isPedometerAvailable,
    stopWatching,
    stepsCountState,
    durationState,
    caloriesState,
    isRunning,
    resetStopwatchHandler,
  };
}
