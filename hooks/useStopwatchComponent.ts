import { useEffect } from "react";
import * as BackgroundFetch from "expo-background-fetch";
import { calculateCalories } from "@/helpers/getCalories";
import { setData } from "@/redux/StopWatch/stopWatchSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { calculateWeightLossByDurationInSeconds } from "@/helpers/calculateWeightLoss";
import useSaveActivity from "@/hooks/useSaveActivity";
import { convertStepsToKm } from "@/helpers/convertStepsToKm";
import debounce from "lodash.debounce";
import { getDays } from "@/helpers/getDays";
export const useStopwatchComponent = (intervalId: NodeJS.Timeout | null) => {
  const dispatch = useDispatch();
  const { getSavedActivityIndex, activities, isLoading, loadActivities } =
    useSaveActivity();
  const stopwatch = useSelector((state: RootState) => state.stopwatch);
  const { duration, steps, isRunning, selectedActivity, weight } = stopwatch;
  const { today } = getDays();
console.log(activities.length,'activities')
  const checkActivity = async () => {
    const activityIndex = await getSavedActivityIndex(
      selectedActivity,
      today.toISOString()
    );

    if (activityIndex !== -1) {
      dispatch(
        setData({
          duration: activities[activityIndex].duration,
          steps: activities[activityIndex].steps,
        })
      );
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

    return () => {
      BackgroundFetch.unregisterTaskAsync("BACKGROUND_STOPWATCH");
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
  }, []);

  const debouncedDispatch = debounce(() => {
    const calculatedCalories = calculateCalories(weight, steps);
    const calculatedDistance = convertStepsToKm(steps);
    const totalDeficit = calculateWeightLossByDurationInSeconds(
      calculatedCalories,
      duration
    );

    const newWeight = weight - totalDeficit;
    setData({
      weight: newWeight,
      calories: calculatedCalories,
      distance: calculatedDistance,
    });
  }, 1000);

  useEffect(() => {
    isRunning && debouncedDispatch();
  }, [duration, debouncedDispatch, isRunning]);

  return { isLoading, checkActivity, loadActivities };
};
