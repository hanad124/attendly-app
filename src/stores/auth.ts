import { create } from 'zustand';
import { authService, LoginResponse } from '@/services/auth';

interface DeviceInfo {
  device_id: string;
  device_model: string;
  device_os: string;
  device_os_version: string;
  last_login?: Date;
  is_active?: boolean;
}

interface AuthState {
  user: LoginResponse['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initialized: boolean;
  initialize: () => Promise<void>;
  login: (username: string, password: string, deviceInfo: DeviceInfo) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  initialized: false,

  login: async (username: string, password: string, deviceInfo: DeviceInfo) => {
    try {
      const response = await authService.login({ 
        username, 
        password,
        deviceId: deviceInfo.device_id,
        devices: [deviceInfo]
      });
      set({ user: response.user, isAuthenticated: true });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Propagate the error to be handled by the login screen
    }
  },

  logout: async () => {
    try {
      await authService.logout();
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const isAuthenticated = await authService.isAuthenticated();
      if (isAuthenticated) {
        const user = await authService.getCurrentUser();
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Check auth error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  initialize: async () => {
    try {
      await useAuthStore.getState().checkAuth();
      set({ initialized: true });
    } catch (error) {
      set({ initialized: true }); 
    }
  },
}));
