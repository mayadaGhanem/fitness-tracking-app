import { setStepCount, setDuration } from "@/redux/StopWatch/stopWatchSlice";
import { RootState } from "@/redux/store";
import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useSteps() {
  const dispatch = useDispatch();
  const [isAvailable, setIsAvailable] = useState(true);
  const { isRunning } = useSelector((state: RootState) => state.stopwatch);
  useEffect(() => {
    let subscription: any;
    let intervalId: any;
    if (isRunning) {
      intervalId = setInterval(() => {
        dispatch(setDuration());
      }, 1000);
      Pedometer.watchStepCount((result) => {
        dispatch(setStepCount(result.steps));
      });
    } else {
      if (subscription) {
        subscription.remove(); 
      }
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
      clearInterval(intervalId);
    };
  }, [isRunning, dispatch]);

  return { isPedometerAvailable: isAvailable };
}
