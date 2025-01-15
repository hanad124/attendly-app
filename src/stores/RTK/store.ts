import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { periodsApi } from "./periods";
import { leaderboardApi } from "./leaderboard";
import { attendanceApi } from "./attendance";

export const store = configureStore({
  reducer: {
    [periodsApi.reducerPath]: periodsApi.reducer,
    [leaderboardApi.reducerPath]: leaderboardApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(periodsApi.middleware)
      .concat(leaderboardApi.middleware)
      .concat(attendanceApi.middleware),
});

setupListeners(store.dispatch);
