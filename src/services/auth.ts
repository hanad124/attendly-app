import { axiosInstance } from "@/lib/axios";
import * as SecureStore from "expo-secure-store";

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    name: string;
    studentId: string;
  };
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await axiosInstance.post<LoginResponse>("/auth/login", credentials);
      
      if (response.data.token) {
        await SecureStore.setItemAsync("token", response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync("token");
    } catch (error) {
      throw error;
    }
  },

  async getCurrentUser(): Promise<LoginResponse["user"] | null> {
    try {
      const response = await axiosInstance.get<LoginResponse>("/auth/me");
      return response.data.user;
    } catch (error) {
      return null;
    }
  },

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await SecureStore.getItemAsync("token");
      return !!token;
    } catch {
      return false;
    }
  },
};
