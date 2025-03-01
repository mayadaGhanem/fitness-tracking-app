import { configureStore } from "@reduxjs/toolkit";
import stopWatchReducer from "./StopWatch/stopWatchSlice";

export const store = configureStore({
  reducer: {
    stopwatch: stopWatchReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
