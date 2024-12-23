import { axiosInstance } from "@/lib/axios";
import * as SecureStore from "expo-secure-store";

interface Ability {
  action: string;
  subject: string;
}

interface Role {
  _id: string;
  name: string;
  ability: Ability[];
  createdBy: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface TokenInfo {
  token: string;
  expires: string;
}

interface Tokens {
  access: TokenInfo;
  refresh: TokenInfo;
}

export interface User {
  email: string;
  role: Role;
  isEmailVerified: boolean;
  username: string;
  status: string;
  dateCreated: string;
  lastLogin: string;
  id: string;
}

export interface LoginResponse {
  tokens: Tokens;
  user: User;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ApiError {
  message: string;
  status: number;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await axiosInstance.post<LoginResponse>("/auth/login-with-username", credentials);

      console.log("Log in response:", response.data);
      
      if (response.data.tokens.access.token) {
        await SecureStore.setItemAsync("token", response.data.tokens.access.token);
        await SecureStore.setItemAsync("refreshToken", response.data.tokens.refresh.token);
      }
      
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.response?.data?.message || "Login failed",
        status: error.response?.status || 500
      };
      throw apiError;
    }
  },

  async logout(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("refreshToken");
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.message || "Logout failed",
        status: 500
      };
      throw apiError;
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await axiosInstance.get<User>("/users/me");
      return response.data;
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
