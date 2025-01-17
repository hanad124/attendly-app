import * as SecureStore from "expo-secure-store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  // baseUrl: "http://10.1.1.29:8080/v1/",
  baseUrl: "http://192.168.113.125:8080/v1/",
  prepareHeaders: async (headers) => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    } catch (error) {
      console.error("Error retrieving token from SecureStore:", error);
      return headers;
    }
  },
  validateStatus: (res) => {
    if (res.status === 401) {
      // Handle token expiry or unauthorized access
    }
    return res.ok;
  }
});
