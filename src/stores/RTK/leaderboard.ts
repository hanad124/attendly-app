// import { createApi } from "@reduxjs/toolkit/query/react";
// import { baseQuery } from "./baseQuery";

// export const leaderboardApi = createApi({
//   reducerPath: "leaderboard",
//   baseQuery: baseQuery,
//   tagTypes: ["leaderboard"],
//   endpoints: (builder) => ({
//     getLeaderboard: builder.query<any, any>({
//       query: params => {
//         const serializedParams = new URLSearchParams(params).toString();
//         return `/leaderboards?${serializedParams}`;
//       },
//       providesTags: ["leaderboard"],
//     }),
//   }),
// });



// export const { useGetLeaderboardQuery } = leaderboardApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const leaderboardApi = createApi({
  reducerPath: "leaderboard",
  baseQuery: baseQuery,
  tagTypes: ["leaderboard"],
  endpoints: (builder) => ({
    getLeaderboard: builder.query<any, any>({
      query: ({ currentPage }) => ({
        url: '/leaderboards',
        params: {
          'options[populate][0][path]': 'rankings.student_id',
          'options[populate][0][model]': 'User',
          'options[populate][0][select]': 'firstName lastName username',
          'options[populate][0][strictPopulate]': false,
          'options[populate][1][path]': 'semester_id',
          'options[populate][1][model]': 'Semester',
          'options[populate][1][select]': 'name start_date end_date academic_year_id status',
          'options[populate][1][strictPopulate]': false,
          'limit': 10,
          'page': currentPage,
          'query[type]': 'Class'
        }
      }),
      providesTags: ["leaderboard"],
    }),
  }),
});

export const { useGetLeaderboardQuery } = leaderboardApi;
