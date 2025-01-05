import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const apiSlice = createApi({
  reducerPath: "periods",
  baseQuery: baseQuery,
  tagTypes: ["periods"],
  endpoints: (builder) => ({
    getSchedules: builder.query<any, any>({
      query: params => {
        const serializedParams = new URLSearchParams(params).toString();
        return `/periods?${serializedParams}`;
      },
      providesTags: ["periods"],
    }),
  }),
});



export const { useGetSchedulesQuery } = apiSlice;
