import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StopwatchState } from "./StopWatch.interface";

export const initialState: StopwatchState = {
  duration: 0,
  steps: 0,
  calories: 0,
  distance: 0,
  isRunning: false,
  weight: 75,
  type: "run",
};

const stopwatchSlice = createSlice({
  name: "stopwatch",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<Partial<StopwatchState>>) {
      return { ...state, ...action.payload };
    },
    setDuration(state) {
      state.duration += 1;
    },
    setStepCount(state, action: PayloadAction<number>) {
      state.steps = action.payload;
    },

    setIsRunning(state, action: PayloadAction<boolean>) {
      state.isRunning = action.payload;
    },
    setActivity(state, action: PayloadAction<StopwatchState["type"]>) {
      state.type = action.payload;
    },

    resetStopwatch(state) {
      state.duration = 0;
      state.steps = 0;
      state.calories = 0;
      state.isRunning = false;
    },
  },
});

export const {
  setDuration,
  setData,
  setStepCount,
  setIsRunning,
  resetStopwatch,
  setActivity,
} = stopwatchSlice.actions;

export default stopwatchSlice.reducer;
