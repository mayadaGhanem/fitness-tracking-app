import { setStepCount, setDuration } from "@/redux/StopWatch/stopWatchSlice";
import { RootState } from "@/redux/store";
import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export function useSteps() {
  const dispatch = useDispatch();
  const { isRunning } = useSelector((state: RootState) => state.stopwatch);
  const [isPedometerAvailable, setIsPedometerAvailable] =
    useState<boolean>(false);

  let stepWatch: Pedometer.Subscription | null = null;
  useEffect(() => {
    checkPedometerAvailability();
  }, []);

  useEffect(() => {
    let intervalId: any;

    if (isRunning && isPedometerAvailable) {
      // Start watching step count
      intervalId = setInterval(() => {
        dispatch(setDuration());
      }, 1000);
      stepWatch = Pedometer.watchStepCount((result) => {
        dispatch(setStepCount(result.steps)); // Dispatch to Redux
      });
    }

    // Cleanup function to stop watching steps when the component unmounts or tracking stops
    return () => {
      if (stepWatch) {
        stepWatch.remove();
      }
      clearInterval(intervalId);
    };
  }, [isRunning, isPedometerAvailable]);

  // Function to toggle step tracking on and off
  const stopWatching = () => {
    if (stepWatch) {
      stepWatch.remove();
    }
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
    setIsPedometerAvailable(available);

    if (!available) {
      Alert.alert(
        "Pedometer Not Available",
        "Your device does not support step tracking."
      );
    } else {
      handlePedometerPermission();
    }
  };
  return { isPedometerAvailable, stopWatching };
}
