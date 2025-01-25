import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const baseURL = "http://10.1.1.29:8080/v1";
// export const baseURL = "http://192.168.1.8:8080/v1/";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      await SecureStore.deleteItemAsync("token");

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
