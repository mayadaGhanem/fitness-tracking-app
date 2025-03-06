import {
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
import { saveActivityToStorage } from "@/helpers/handleActivityStorage";
import * as BackgroundFetch from "expo-background-fetch";

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
      intervalId = setInterval(() => {
        setDurationState((prev) => ++prev);
      }, 1000);
      stepWatch = Pedometer.watchStepCount((result) => {
        const newSteps = result.steps;
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
    if (!stepsCountState) {
      resetStopwatchHandler();
      Alert.alert("your steps zero please start move");
      return;
    }

    const calculatedDistance = convertStepsToKm(stepsCountState);

    await saveActivityToStorage({
      steps: stepsCountState,
      duration: durationState,
      type,
      calories: caloriesState,
      distance: calculatedDistance,
    });
    resetStopwatchHandler();
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

    return () => {
      BackgroundFetch.unregisterTaskAsync("BACKGROUND_STOPWATCH");
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
  }, []);

  const resetStopwatchHandler = async () => {
    dispatch(resetStopwatch());
    setStepsData(initial);
    setDurationState(0);
  };

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
