import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import IconButton from "../../ui/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { resetStopwatch, setIsRunning } from "@/redux/StopWatch/stopWatchSlice";
import { RootState } from "@/redux/store";
import useSaveActivity from "@/hooks/useSaveActivity";

export default function ActionContainer({
  stopWatching,
}: {
  stopWatching: () => void;
}) {
  const { saveActivityToStorage, clearActivityFromStorage } = useSaveActivity();
  const stopwatchState = useSelector((state: RootState) => state.stopwatch);
  const { isRunning } = stopwatchState;
  const dispatch = useDispatch();

  const startStopwatch = () => {
    dispatch(setIsRunning(true));
  };

  const stop = async () => {
    dispatch(setIsRunning(false));
    await saveActivityToStorage({
      ...stopwatchState,
      type: stopwatchState.selectedActivity,
    });
    stopWatching();
  };

  const resetStopwatchHandler = async () => {
    await clearActivityFromStorage(stopwatchState.selectedActivity);
    dispatch(resetStopwatch());
  };
  return (
    <View style={styles.buttonContainer}>
      <IconButton
        style={[styles.button, styles.playButtonContainer]}
        onPress={isRunning ? stop : startStopwatch}
        name={isRunning ? "pause" : "play"}
        color={Colors.dark.secondary}
        size={18}
      />
      <IconButton
        style={[styles.button, styles.resetButtonContainer]}
        onPress={resetStopwatchHandler}
        name={"trash"}
        size={18}
        color={Colors.dark.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    paddingTop: 24,
    gap: 64,
  },
  button: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  playButtonContainer: {
    backgroundColor: Colors.dark.primary,
  },
  resetButtonContainer: {
    backgroundColor: Colors.dark.icon.background,
  },
});
