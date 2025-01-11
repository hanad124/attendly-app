import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const leaderboardApi = createApi({
  reducerPath: "leaderboard",
  baseQuery: baseQuery,
  tagTypes: ["leaderboard"],
  endpoints: (builder) => ({
    getLeaderboard: builder.query<any, any>({
      query: params => {
        const serializedParams = new URLSearchParams(params).toString();
        return `/leaderboards?${serializedParams}`;
      },
      providesTags: ["leaderboard"],
    }),
  }),
});



export const { useGetLeaderboardQuery } = leaderboardApi;
