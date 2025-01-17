import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: baseQuery,
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getSelf: builder.query({
      query: (params) => {
        const serializedParams = new URLSearchParams(params).toString();
        return `/users/me?${serializedParams}`;
      },
      providesTags: ["users"],
    }),
  }),
});

export const { useGetSelfQuery } = usersApi;
