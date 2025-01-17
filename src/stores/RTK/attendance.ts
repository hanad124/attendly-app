import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const attendanceApi = createApi({
  reducerPath: "attendance",
  baseQuery: baseQuery,
  tagTypes: ["attendance"],
  endpoints: (builder) => ({
    verifyAttendance: builder.mutation({
      query: (verify) => ({
        url: "/attendance_verifications/verify",
        method: "POST",
        body: verify,
      }),
      invalidatesTags: ["attendance"],
    }),

    // get Attendance stats
    AttendanceStats: builder.query<any, { studentId: string; semesterId: string }>({
      query: ({ studentId, semesterId }) => `/attendance_stats/student/${studentId}/semester/${semesterId}`,
      providesTags: ["attendance"],
    }),
  }),
});

export const { useVerifyAttendanceMutation, useAttendanceStatsQuery } = attendanceApi;
