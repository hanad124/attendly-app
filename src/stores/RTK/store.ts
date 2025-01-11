import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { periodsApi } from "./periods";
import { leaderboardApi } from "./leaderboard";

export const store = configureStore({
  reducer: {
    [periodsApi.reducerPath]: periodsApi.reducer,
    [leaderboardApi.reducerPath]: leaderboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(periodsApi.middleware)
      .concat(leaderboardApi.middleware),
});

setupListeners(store.dispatch);
